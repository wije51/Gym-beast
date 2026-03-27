# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in Gym Beast, please email **security@gymbeast.example** instead of using the issue tracker. Please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We take security seriously and will respond within 48 hours.

## Dependency Security

This project uses npm for dependency management. To check for vulnerabilities:

```bash
npm audit
npm audit fix
```

GitHub Dependabot is enabled and will automatically:
- Scan for vulnerable dependencies
- Create pull requests for updates
- Alert on new vulnerabilities

## File Upload Safety Guidelines

### ⚠️ CRITICAL - If Implementing File Uploads:

#### 1. Backend Validation (Required)
```javascript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

// Validate on server ONLY, never trust client
if (file.size > MAX_FILE_SIZE) throw new Error('File too large');
if (!ALLOWED_MIMES.includes(file.type)) throw new Error('Invalid file type');

// Check magic bytes
const magic = await checkFileMagic(file);
if (!isValidMagic(magic, ALLOWED_MIMES)) throw new Error('Malicious file');
```

#### 2. Malware Scanning
Integrate ClamAV or VirusTotal:
```javascript
const FormData = require('form-data');
const axios = require('axios');

async function scanFile(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  
  // Using ClamAV
  const result = await axios.post('http://clamav-server:3310/scan', form);
  return result.data.clean;
}
```

#### 3. Secure Storage
```javascript
// Use cloud storage, NOT local filesystem
import AWS from 'aws-sdk';
const s3 = new AWS.S3();

const params = {
  Bucket: 'gym-beast-uploads',
  Key: `uploads/${randomUUID()}`,
  Body: file,
  ContentType: file.mimetype,
  ServerSideEncryption: 'AES256',
  ACL: 'private'
};

await s3.upload(params).promise();
```

#### 4. Filename Sanitization
```javascript
function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
    .replace(/^-+/, '')
    .replace(/\.{2,}/g, '.');
}

// Use UUID instead
import { randomUUID } from 'crypto';
const safeFilename = `${randomUUID()}-${sanitizeFilename(filename)}`;
```

#### 5. HTTP Headers (Server Config)
```nginx
# nginx example
location /uploads/ {
  default_type application/octet-stream;
  add_header Content-Disposition "attachment";
  add_header X-Content-Type-Options "nosniff";
  add_header X-Frame-Options "DENY";
  
  # Prevent script execution
  types {
    text/plain php exe sh bat cmd;
  }
}
```

#### 6. Rate Limiting
```javascript
import rateLimit from 'express-rate-limit';

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 uploads per 15 mins per IP
  message: 'Too many uploads, try again later'
});

app.post('/upload', uploadLimiter, handleUpload);
```

## Content Security Policy (CSP)

Implement CSP headers to prevent XSS attacks:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
```

## Secure Headers

Always set these headers in production:

```javascript
// Express example
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

## Environment Variables

Never commit secrets to git:

```env
# .env (add to .gitignore)
VITE_API_KEY=your_secret_key_here
DATABASE_URL=postgresql://user:password@host:5432/db
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

## Supply Chain Security

- ✅ Always use `npm ci` in CI/CD (not `npm install`)
- ✅ Use lock files (`package-lock.json`)
- ✅ Review large dependency updates manually
- ✅ Vet new dependencies before adding
- ✅ Use `npm audit` before production releases
- ✅ Keep Node.js updated

## Input Validation

Always validate user input:

```typescript
// Bad ❌
const handleInput = (input: string) => {
  document.innerHTML = input; // XSS vulnerability
};

// Good ✅
import DOMPurify from 'dompurify';

const handleInput = (input: string) => {
  const clean = DOMPurify.sanitize(input);
  document.innerHTML = clean;
};
```

## CORS Configuration

Restrict CORS to trusted origins only:

```javascript
app.use(cors({
  origin: ['https://gymbeast.example', 'https://www.gymbeast.example'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

## Authentication & Authorization

When implementing user accounts:

- Use bcrypt for password hashing (min 12 rounds)
- Implement rate limiting on login endpoints
- Use JWT with short expiration (15 min access, refresh tokens)
- Validate tokens server-side on every request
- Implement CSRF protection
- Use secure, HttpOnly cookies for tokens

```javascript
// Secure password hashing
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 12);
```

## Regular Security Audits

- Run `npm audit` weekly
- Use OWASP ZAP for penetration testing
- Perform code reviews focusing on security
- Keep track of security advisories
- Subscribe to security mailing lists

## Compliance

- GDPR (if handling EU user data)
- CCPA (if handling California resident data)
- PCI DSS (if handling payment data)

## Questions?

For security questions or to report issues privately, email: **security@gymbeast.example**

---

**Last Updated:** March 27, 2026
