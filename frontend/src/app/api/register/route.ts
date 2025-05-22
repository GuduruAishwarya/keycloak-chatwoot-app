import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
  const adminClientId = process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_CLIENT_ID;
  const adminUsername = process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_USERNAME;
  const adminPassword = process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_PASSWORD;

  try {
    // 1. Get admin access token from master realm ---update to custom realm @@@@@@@@@@@@@@@
    const tokenRes = await fetch(`${keycloakUrl}/realms/master/protocol/openid-connect/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'password',
        client_id: adminClientId!,
        username: adminUsername!,
        password: adminPassword!,
      }),
    });
    const tokenData = await tokenRes.json();
    console.log('..',tokenData)
    if (!tokenRes.ok) {
      return NextResponse.json({ error: 'Failed to get admin token', details: tokenData }, { status: 500 });
    }
    const accessToken = tokenData.access_token;

    // 2. Create user
    const userRes = await fetch(`${keycloakUrl}/admin/realms/${realm}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        username,
        enabled: true,
        credentials: [{ type: 'password', value: password, temporary: false }],
      }),
    });

    if (userRes.status === 201) {
      return NextResponse.json({ success: true });
    } else {
      const error = await userRes.text();
      return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed', details: (err as any).toString() }, { status: 500 });
  }
}
