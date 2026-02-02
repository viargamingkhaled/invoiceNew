#!/usr/bin/env node

/**
 * Quick diagnostic script to check Spoynt integration health
 * Run: node scripts/check-spoynt-health.js
 */

const https = require('https');

const CHECKS = [
  {
    name: 'Callback URL Accessibility',
    url: 'https://ventira.co.uk/api/payments/spoynt/callback',
    method: 'POST',
    expectedStatus: 200,
    expectedBody: 'Spoynt callback handler',
  },
  {
    name: 'Return URL Accessibility',
    url: 'https://ventira.co.uk/payment/result',
    method: 'GET',
    expectedStatus: 200,
  },
  {
    name: 'Payment API Accessibility',
    url: 'https://ventira.co.uk/api/payments/spoynt',
    method: 'GET',
    expectedStatus: 405, // Method not allowed (POST required)
  },
];

function checkUrl(check) {
  return new Promise((resolve) => {
    const url = new URL(check.url);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: check.method,
      headers: {
        'User-Agent': 'Spoynt-Health-Check/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const passed = res.statusCode === check.expectedStatus;
        const bodyMatch = check.expectedBody ? data.includes(check.expectedBody) : true;
        
        resolve({
          name: check.name,
          passed: passed && bodyMatch,
          status: res.statusCode,
          expected: check.expectedStatus,
          body: data.substring(0, 100),
          url: check.url,
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        name: check.name,
        passed: false,
        error: error.message,
        url: check.url,
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        name: check.name,
        passed: false,
        error: 'Timeout after 5 seconds',
        url: check.url,
      });
    });

    req.end();
  });
}

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🔍 Spoynt Integration Health Check');
  console.log('═══════════════════════════════════════════════════════\n');

  const results = await Promise.all(CHECKS.map(checkUrl));

  results.forEach((result) => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
    console.log(`   URL: ${result.url}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else {
      console.log(`   Status: ${result.status} (expected ${result.expected})`);
      if (result.body) {
        console.log(`   Body: ${result.body}...`);
      }
    }
    console.log('');
  });

  const allPassed = results.every(r => r.passed);
  
  console.log('═══════════════════════════════════════════════════════');
  if (allPassed) {
    console.log('✅ All checks passed! URLs are accessible.');
  } else {
    console.log('❌ Some checks failed. See details above.');
  }
  console.log('═══════════════════════════════════════════════════════\n');

  // Environment variables check
  console.log('📋 Environment Variables Check:');
  const requiredEnvVars = [
    'SPOYNT_ACCOUNT_ID',
    'SPOYNT_PUBLIC_KEY',
    'SPOYNT_PRIVATE_KEY',
    'SPOYNT_SECRET_KEY',
    'NEXT_PUBLIC_APP_URL',
  ];

  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];
    const icon = value ? '✅' : '❌';
    const display = value ? `${value.substring(0, 10)}...` : 'Not set';
    console.log(`${icon} ${envVar}: ${display}`);
  });

  console.log('\n💡 Next steps:');
  console.log('1. Check Vercel logs: vercel logs --follow');
  console.log('2. Test payment with detailed logs');
  console.log('3. Check Spoynt Dashboard for service configuration');
  console.log('4. Contact Spoynt support if issues persist');

  process.exit(allPassed ? 0 : 1);
}

main().catch(console.error);
