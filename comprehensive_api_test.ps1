# Primus IDP Comprehensive API Testing
# This script validates all backend endpoints systematically

Write-Host "`n=================================" -ForegroundColor Cyan
Write-Host "  PRIMUS IDP API VALIDATION" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n" -ForegroundColor Gray

$backendUrl = "http://localhost:8000"
$results = @()

# Test endpoint helper
function Test-API {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Category,
        [string]$Description,
        [hashtable]$Headers = @{},
        [string]$Body = $null,
        [int]$ExpectedStatus = 200
    )
    
    $startTime = Get-Date
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            UseBasicParsing = $true
            TimeoutSec = 10
            Headers = $Headers
        }
        
        if ($Body) {
            $params.Body = $Body
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params -ErrorAction Stop
        $duration = [math]::Round(((Get-Date) - $startTime).TotalMilliseconds, 2)
        
        return [PSCustomObject]@{
            Category = $Category
            Endpoint = $Url.Replace($backendUrl, "")
            Method = $Method
            Description = $Description
            StatusCode = $response.StatusCode
            Expected = $ExpectedStatus
            Match = ($response.StatusCode -eq $ExpectedStatus)
            Duration = "${duration}ms"
            Size = $response.Content.Length
            ContentType = $response.Headers.'Content-Type'[0]
            Success = $true
        }
    }
    catch {
        $duration = [math]::Round(((Get-Date) - $startTime).TotalMilliseconds, 2)
        $statusCode = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
        
        return [PSCustomObject]@{
            Category = $Category
            Endpoint = $Url.Replace($backendUrl, "")
            Method = $Method
            Description = $Description
            StatusCode = $statusCode
            Expected = $ExpectedStatus
            Match = ($statusCode -eq $ExpectedStatus)
            Duration = "${duration}ms"
            Size = 0
            ContentType = "N/A"
            Success = ($statusCode -eq $ExpectedStatus)
        }
    }
}

Write-Host "=== INFRASTRUCTURE CHECK ===" -ForegroundColor Yellow
Write-Host "`nDocker Containers:" -ForegroundColor Green
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | Write-Host

Write-Host "`nPort Listening Status:" -ForegroundColor Green
$ports = @(
    @{Port=5432; Service="PostgreSQL"},
    @{Port=6379; Service="Redis"},
    @{Port=8000; Service="Backend API"},
    @{Port=8001; Service="Frontend"}
)

foreach ($p in $ports) {
    $listening = Test-NetConnection -ComputerName localhost -Port $p.Port -InformationLevel Quiet -WarningAction SilentlyContinue
    $status = if ($listening) { "LISTENING" } else { "NOT LISTENING" }
    $color = if ($listening) { "Green" } else { "Red" }
    Write-Host ("  [{0,4}] {1,-15} : {2}" -f $p.Port, $p.Service, $status) -ForegroundColor $color
}

Write-Host "`n=== API DOCUMENTATION ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/docs" `
    -Category "Docs" -Description "Swagger UI" -ExpectedStatus 200

$results += Test-API -Method "GET" -Url "$backendUrl/openapi.json" `
    -Category "Docs" -Description "OpenAPI Schema" -ExpectedStatus 200

$results += Test-API -Method "GET" -Url "$backendUrl/redoc" `
    -Category "Docs" -Description "ReDoc UI" -ExpectedStatus 200

Write-Host "`n=== AUTHENTICATION ENDPOINTS ===" -ForegroundColor Yellow

# Test register endpoint (should require body - 422 expected)
$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/auth/register" `
    -Category "Auth" -Description "Register (no body)" -ExpectedStatus 422

# Test login endpoint (should require body - 422 expected)
$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/auth/jwt/login" `
    -Category "Auth" -Description "Login (no body)" -ExpectedStatus 422

# Test logout endpoint (should require auth - 401 expected)
$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/auth/jwt/logout" `
    -Category "Auth" -Description "Logout (no auth)" -ExpectedStatus 401

# Test verify token (should require auth - 401 expected)
$results += Test-API -Method "GET" -Url "$backendUrl/verify-token" `
    -Category "Auth" -Description "Verify Token (no auth)" -ExpectedStatus 401

Write-Host "`n=== USER MANAGEMENT ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/users/me" `
    -Category "Users" -Description "Get Current User (no auth)" -ExpectedStatus 401

$results += Test-API -Method "PATCH" -Url "$backendUrl/api/v1/users/me" `
    -Category "Users" -Description "Update User (no auth)" -ExpectedStatus 401

Write-Host "`n=== SEARCH SPACES ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/search-spaces" `
    -Category "Search Spaces" -Description "List Search Spaces (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/search-spaces/" `
    -Category "Search Spaces" -Description "Create Search Space (no auth)" -ExpectedStatus 401

Write-Host "`n=== DOCUMENTS ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/documents/" `
    -Category "Documents" -Description "List Documents (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/documents/" `
    -Category "Documents" -Description "Create Document (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/documents/fileupload" `
    -Category "Documents" -Description "Upload File (no auth)" -ExpectedStatus 401

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/documents/type-counts/" `
    -Category "Documents" -Description "Document Type Counts (no auth)" -ExpectedStatus 401

Write-Host "`n=== CONNECTORS ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/search-source-connectors/" `
    -Category "Connectors" -Description "List Connectors (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/search-source-connectors/" `
    -Category "Connectors" -Description "Create Connector (no auth)" -ExpectedStatus 401

Write-Host "`n=== LLM CONFIGURATION ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/llm-configs/" `
    -Category "LLM Configs" -Description "List LLM Configs (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/llm-configs/" `
    -Category "LLM Configs" -Description "Create LLM Config (no auth)" -ExpectedStatus 401

Write-Host "`n=== CHAT ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/chats/" `
    -Category "Chats" -Description "List Chats (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/chats/" `
    -Category "Chats" -Description "Create Chat (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/chat" `
    -Category "Chats" -Description "Chat Stream (no auth)" -ExpectedStatus 401

Write-Host "`n=== PODCAST ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/podcasts/" `
    -Category "Podcasts" -Description "List Podcasts (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/podcasts/" `
    -Category "Podcasts" -Description "Create Podcast (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/podcasts/generate/" `
    -Category "Podcasts" -Description "Generate Podcast (no auth)" -ExpectedStatus 401

Write-Host "`n=== LOGS ENDPOINTS ===" -ForegroundColor Yellow

$results += Test-API -Method "GET" -Url "$backendUrl/api/v1/logs/" `
    -Category "Logs" -Description "List Logs (no auth)" -ExpectedStatus 401

$results += Test-API -Method "POST" -Url "$backendUrl/api/v1/logs/" `
    -Category "Logs" -Description "Create Log (no auth)" -ExpectedStatus 401

Write-Host "`n`n=== CONFIGURATION SUMMARY ===" -ForegroundColor Cyan

Write-Host "`nBackend Configuration:" -ForegroundColor Green
$backendConfig = @"
  Database    : PostgreSQL @ localhost:5432
  Cache       : Redis @ localhost:6379
  Backend API : $backendUrl
  Version     : 0.0.8
  Auth Type   : LOCAL
  ETL Service : DOCLING
  Embedding   : sentence-transformers/all-MiniLM-L6-v2
"@
Write-Host $backendConfig -ForegroundColor Gray

Write-Host "`nFrontend Configuration:" -ForegroundColor Green
$frontendConfig = @"
  Frontend URL: http://localhost:8001
  Backend URL : $backendUrl
  Version     : 0.0.8
  Framework   : Next.js 15.5.6 (Turbopack)
  React       : 19.1.0
"@
Write-Host $frontendConfig -ForegroundColor Gray

Write-Host "`n`n=== TEST RESULTS SUMMARY ===" -ForegroundColor Cyan

# Group by category
$results | Group-Object -Property Category | ForEach-Object {
    Write-Host "`n[$($_.Name)]" -ForegroundColor Yellow
    $_.Group | ForEach-Object {
        $statusColor = if ($_.Match) { "Green" } else { "Red" }
        $matchSymbol = if ($_.Match) { "OK" } else { "FAIL" }
        Write-Host ("  {0,-6} {1,-45} [{2}] {3}/{4} ({5})" -f `
            $_.Method, $_.Endpoint, $matchSymbol, $_.StatusCode, $_.Expected, $_.Duration) `
            -ForegroundColor $statusColor
    }
}

# Statistics
Write-Host "`n`n=== STATISTICS ===" -ForegroundColor Cyan
$total = $results.Count
$passed = ($results | Where-Object { $_.Match -eq $true }).Count
$failed = $total - $passed
$passRate = [math]::Round(($passed / $total) * 100, 2)

Write-Host "Total Endpoints Tested : $total" -ForegroundColor White
Write-Host "Passed (Expected)      : $passed" -ForegroundColor Green
Write-Host "Failed (Unexpected)    : $failed" -ForegroundColor Red
Write-Host "Pass Rate              : $passRate%" -ForegroundColor Yellow

# Export results
$exportPath = "c:\Users\Akki\SurfSense\api_test_results_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
$results | ConvertTo-Json -Depth 5 | Out-File -FilePath $exportPath -Encoding UTF8
Write-Host "`nDetailed results exported to:" -ForegroundColor Cyan
Write-Host "  $exportPath" -ForegroundColor Gray

Write-Host "`n`n=================================" -ForegroundColor Cyan
Write-Host "  VALIDATION COMPLETE" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
