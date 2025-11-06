import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password, action } = await request.json();

  const hasNoEmailOrPassword = !email || !password;
  const isSignUp = action === 'signup';

  if (hasNoEmailOrPassword) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  let result;

  if (isSignUp) {
    result = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
      },
    });
  } else {
    result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  // For sign-up, check if email confirmation is required
  if (isSignUp) {
    const hasSession = !!result.data.session;

    if (hasSession) {
      // User is immediately authenticated (email confirmation disabled)
      return NextResponse.json({
        success: true,
        user: result.data.user,
        requiresEmailConfirmation: false,
      });
    } else {
      // Email confirmation is required
      return NextResponse.json({
        success: true,
        user: result.data.user,
        requiresEmailConfirmation: true,
        message: 'Please check your email to confirm your account',
      });
    }
  }

  // For sign-in, session should always exist
  return NextResponse.json({ success: true, user: result.data.user });
}
