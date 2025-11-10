# How to Get Your Bearer Token

To run the upload audit script, you need your authentication token from the browser.

## Steps to Get Token:

1. **Open Primus IDP in your browser**:
   - Navigate to: `http://localhost:8001`
   - Make sure you're logged in

2. **Open Browser DevTools**:
   - Press `F12` or right-click → "Inspect"
   - Go to the **Console** tab

3. **Run this command in the console**:
   ```javascript
   localStorage.getItem('primus_idp_bearer_token')
   ```

4. **Copy the output** (it will look like a long string of random characters)

5. **Run the audit script**:
   ```powershell
   cd c:\Users\Akki\SurfSense\surfsense_backend
   & c:\Users\Akki\SurfSense\.venv\Scripts\python.exe upload_audit.py
   ```

6. **Paste the token** when prompted

## Alternative: Extract Token Programmatically

If you can't access the browser, I can create a login script to get a fresh token.
