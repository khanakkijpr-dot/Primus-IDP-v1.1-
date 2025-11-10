# Primus IDP End-to-End API Validation Script
# Tests all backend endpoints and captures comprehensive results

Write-Host "`n=== PRIMUS IDP END-TO-END VALIDATION ===" -ForegroundColor Cyan
Write-Host "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

# Configuration
$backendUrl = "http://localhost:8000"
$frontendUrl = "http://localhost:8001"
$results = @()

# Helper function to test endpoint
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [hashtable]$Headers = @{},
        [string]$Body = $null
    )
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            UseBasicParsing = $true
            TimeoutSec = 10
        }
        
        if ($Headers.Count -gt 0) {
            $params.Headers = $Headers
        }
        
        if ($Body) {
            $params.Body = $Body
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params
        
        return [PSCustomObject]@{
            Endpoint = $Url
            Method = $Method
            Description = $Description
            StatusCode = $response.StatusCode
            StatusDescription = "OK"
            ResponseTime = "N/A"
            ContentLength = $response.Content.Length
            ContentType = $response.Headers.'Content-Type'
            Success = $true
            ErrorMessage = ""
            ResponsePreview = if ($response.Content.Length -gt 200) { 
                $response.Content.Substring(0, 200) + "..." 
            } else { 
                $response.Content 
            }
        }
    }
    catch {
        return [PSCustomObject]@{
            Endpoint = $Url
            Method = $Method
            Description = $Description
            StatusCode = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
            StatusDescription = if ($_.Exception.Response) { $_.Exception.Response.StatusDescription } else { "Connection Failed" }
            ResponseTime = "N/A"
            ContentLength = 0
            ContentType = "N/A"
            Success = $false
            ErrorMessage = $_.Exception.Message
            ResponsePreview = ""
        }
    }
}

Write-Host "`n--- Phase 1: Service Availability Check ---" -ForegroundColor Yellow

# Check Docker containers
Write-Host "`nDocker Containers:" -ForegroundColor Green
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | Write-Host

# Check ports
Write-Host "`nPort Status:" -ForegroundColor Green
$ports = @(5432, 6379, 8000, 8001)
foreach ($port in $ports) {
    $listening = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    $status = if ($listening) { "[OK] LISTENING" } else { "[X] NOT LISTENING" }
    $color = if ($listening) { "Green" } else { "Red" }
    Write-Host "  Port $port : $status" -ForegroundColor $color
}

Write-Host "`n--- Phase 2: Backend API Endpoint Testing ---" -ForegroundColor Yellow

# Test root endpoint
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/" -Description "Backend Root"

# Test OpenAPI docs
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/docs" -Description "OpenAPI Documentation"
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/openapi.json" -Description "OpenAPI Schema"

# Test health endpoint
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/api/v1/health" -Description "Health Check"

# Test auth endpoints (public)
$results += Test-Endpoint -Method "POST" -Url "$backendUrl/api/v1/auth/register" -Description "Register Endpoint (OPTIONS)" -Body '{"email":"test@example.com","password":"testpass123"}'
$results += Test-Endpoint -Method "POST" -Url "$backendUrl/api/v1/auth/jwt/login" -Description "Login Endpoint (Test)"

# Test user endpoints (will fail without auth - expected)
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/api/v1/users/me" -Description "Get Current User (No Auth)"

# Test search spaces endpoint (will fail without auth - expected)
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/api/v1/search-spaces" -Description "List Search Spaces (No Auth)"

# Test documents endpoint (will fail without auth - expected)
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/api/v1/documents" -Description "List Documents (No Auth)"

# Test connectors endpoint (will fail without auth - expected)
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/api/v1/connectors" -Description "List Connectors (No Auth)"

# Test LLM configs endpoint (will fail without auth - expected)
$results += Test-Endpoint -Method "GET" -Url "$backendUrl/api/v1/llm-configs" -Description "List LLM Configs (No Auth)"

Write-Host "`n--- Phase 3: Frontend Endpoint Testing ---" -ForegroundColor Yellow

# Test frontend endpoints
$results += Test-Endpoint -Method "GET" -Url "$frontendUrl/" -Description "Frontend Homepage"
$results += Test-Endpoint -Method "GET" -Url "$frontendUrl/auth/login" -Description "Frontend Login Page"
$results += Test-Endpoint -Method "GET" -Url "$frontendUrl/auth/register" -Description "Frontend Register Page"

Write-Host "`n--- Phase 4: Configuration Validation ---" -ForegroundColor Yellow

# Check backend configuration
Write-Host "`nBackend Configuration:" -ForegroundColor Green
if (Test-Path "c:\Users\Akki\SurfSense\surfsense_backend\.env") {
    $backendEnv = Get-Content "c:\Users\Akki\SurfSense\surfsense_backend\.env" | Select-String -Pattern "^(DATABASE_URL|UVICORN_PORT|CELERY_BROKER_URL|EMBEDDING_MODEL|ETL_SERVICE)="
    $backendEnv | ForEach-Object {
        $line = $_.Line
        # Mask sensitive values
        if ($line -match "PASSWORD|SECRET|KEY|TOKEN") {
            $line = $line -replace '=.*', '=***MASKED***'
        }
        Write-Host "  $line" -ForegroundColor Gray
    }
}

# Check frontend configuration
Write-Host "`nFrontend Configuration:" -ForegroundColor Green
if (Test-Path "c:\Users\Akki\SurfSense\surfsense_web\.env") {
    $frontendEnv = Get-Content "c:\Users\Akki\SurfSense\surfsense_web\.env" | Select-String -Pattern "^NEXT_PUBLIC_"
    $frontendEnv | ForEach-Object {
        Write-Host "  $($_.Line)" -ForegroundColor Gray
    }
}

Write-Host "`n--- Phase 5: Dependency Versions ---" -ForegroundColor Yellow

# Backend dependencies
Write-Host "`nBackend (Python):" -ForegroundColor Green
if (Test-Path "c:\Users\Akki\SurfSense\surfsense_backend\pyproject.toml") {
    $pyproject = Get-Content "c:\Users\Akki\SurfSense\surfsense_backend\pyproject.toml" | Select-String -Pattern "^version ="
    Write-Host "  $($pyproject.Line)" -ForegroundColor Gray
    
    Write-Host "  Key Dependencies:" -ForegroundColor Gray
    $deps = Get-Content "c:\Users\Akki\SurfSense\surfsense_backend\pyproject.toml" | Select-String -Pattern "(fastapi|langchain|langgraph|uvicorn|sqlalchemy)>="
    $deps | Select-Object -First 5 | ForEach-Object {
        Write-Host "    $($_.Line.Trim())" -ForegroundColor DarkGray
    }
}

# Frontend dependencies
Write-Host "`nFrontend (Next.js):" -ForegroundColor Green
if (Test-Path "c:\Users\Akki\SurfSense\surfsense_web\package.json") {
    $packageJson = Get-Content "c:\Users\Akki\SurfSense\surfsense_web\package.json" -Raw | ConvertFrom-Json
    Write-Host "  Version: $($packageJson.version)" -ForegroundColor Gray
    Write-Host "  Next.js: $($packageJson.dependencies.next)" -ForegroundColor Gray
    Write-Host "  React: $($packageJson.dependencies.react)" -ForegroundColor Gray
}

Write-Host "`n--- Phase 6: Results Summary ---" -ForegroundColor Yellow

# Display results table
$results | Format-Table -Property @(
    @{Label="Method"; Expression={$_.Method}; Width=6},
    @{Label="Endpoint"; Expression={$_.Endpoint}; Width=50},
    @{Label="Status"; Expression={$_.StatusCode}; Width=6},
    @{Label="Success"; Expression={if($_.Success){"OK"}else{"FAIL"}}; Width=7},
    @{Label="Size"; Expression={$_.ContentLength}; Width=8}
) -AutoSize

# Statistics
$totalTests = $results.Count
$successfulTests = ($results | Where-Object { $_.Success -eq $true }).Count
$failedTests = $totalTests - $successfulTests
$successRate = [math]::Round(($successfulTests / $totalTests) * 100, 2)

Write-Host "`n=== TEST STATISTICS ===" -ForegroundColor Cyan
Write-Host "Total Tests: $totalTests" -ForegroundColor White
Write-Host "Successful: $successfulTests" -ForegroundColor Green
Write-Host "Failed: $failedTests" -ForegroundColor Red
Write-Host "Success Rate: $successRate%" -ForegroundColor Yellow

# Export detailed results
$exportPath = "c:\Users\Akki\SurfSense\api_validation_results.json"
$results | ConvertTo-Json -Depth 5 | Out-File -FilePath $exportPath -Encoding UTF8
Write-Host "`nDetailed results exported to: $exportPath" -ForegroundColor Cyan

Write-Host "`n=== VALIDATION COMPLETE ===" -ForegroundColor Cyan
