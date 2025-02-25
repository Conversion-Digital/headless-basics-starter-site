import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const host = req.headers.get('host')
  const path = req.nextUrl.pathname
  var redirectUrl =  ''
  const ip = (req as any).ip || req.headers.get('x-forwarded-for')

  const res = NextResponse.next()
  if (path === '/403') {
		return res
  }

  const isProduction = (process.env.IS_PRODUCTION && process.env.IS_PRODUCTION === 'true') || false;
  if (path.startsWith('/api')) {

		const origin = req.headers.get("origin")

		const allowedOrigins = process.env.ACCESS_CONTROL_ALLOW_ORIGIN ? process.env.ACCESS_CONTROL_ALLOW_ORIGIN : 'localhost'

		res.headers.append('Access-Control-Allow-Origin', allowedOrigins)
		if (allowedOrigins.includes(origin)) {
			res.headers.append('Access-Control-Allow-Origin', allowedOrigins)
		}

		// add the CORS headers to the response
		res.headers.append('Access-Control-Allow-Credentials', process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS)
		res.headers.append('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS)
		res.headers.append('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS)
  } else if (path.startsWith('/library') && isProduction) {
		return NextResponse.redirect(new URL("/403", req.url));
  }

  const isIPFiltered = (process.env.IS_IP_FILTERED && process.env.IS_IP_FILTERED === 'true') || false;
  if (!isIPAllowed(ip) && isIPFiltered === true) {
		return NextResponse.redirect(new URL("/403", req.url));
  }

  
  return res;
}

function isIPAllowed(ip) {
  // Read whitelist from environment variable and split into array
  const varName = 'ALLOWED_IPS'
  if (process.env[varName]) {
		const allowedIps = process.env[varName].split(',').map(ipAddr => ipAddr.trim());
		return allowedIps.includes(ip);
  }
  return true;
}
