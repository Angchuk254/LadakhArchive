# Fix double-encoded UTF-8 at byte level
# Replace specific corrupted byte sequences with correct UTF-8 bytes

$srcDir = "c:\Users\sonam\OneDrive\Desktop\Stakker\Ladakh\LadakhArchive\src\app"
$tsFiles = Get-ChildItem -Path $srcDir -Filter "*.ts" -Recurse
$totalFixed = 0

# Define byte-level replacements: [old_bytes, new_bytes]
# Double-encoded en-dash U+2013: C3 A2 E2 82 AC E2 80 93 -> E2 80 93
# Double-encoded em-dash U+2014: C3 A2 E2 82 AC E2 80 94 -> E2 80 94
# But some have variant ending: C3 A2 E2 82 AC E2 80 9C (left dquote used as ending)
# and: C3 A2 E2 82 AC E2 80 9D

# Actually the pattern is: the original bytes for â (0xC3 0xA2) + € (E2 82 AC) + " (E2 80 9C or 9D)
# This is U+00E2 U+20AC U+201C/201D in UTF-8 encoding = double-encoded en-dash/em-dash

function Replace-ByteSequence {
    param([byte[]]$Source, [byte[]]$Old, [byte[]]$New)
    
    $result = [System.Collections.Generic.List[byte]]::new()
    $i = 0
    while ($i -lt $Source.Length) {
        $matched = $true
        if ($i + $Old.Length -le $Source.Length) {
            for ($j = 0; $j -lt $Old.Length; $j++) {
                if ($Source[$i + $j] -ne $Old[$j]) {
                    $matched = $false
                    break
                }
            }
        } else {
            $matched = $false
        }
        
        if ($matched) {
            $result.AddRange($New)
            $i += $Old.Length
        } else {
            $result.Add($Source[$i])
            $i++
        }
    }
    return $result.ToArray()
}

# Define all replacement patterns
$patterns = @(
    # Double-encoded en-dash (â€" variant with 9C)
    @{ Old = [byte[]]@(0xC3,0xA2,0xE2,0x82,0xAC,0xE2,0x80,0x9C); New = [byte[]]@(0xE2,0x80,0x93) },
    # Double-encoded em-dash (â€" variant with 9D)  
    @{ Old = [byte[]]@(0xC3,0xA2,0xE2,0x82,0xAC,0xE2,0x80,0x9D); New = [byte[]]@(0xE2,0x80,0x94) },
    # Double-encoded en-dash (C3 A2 C2 80 C2 93)
    @{ Old = [byte[]]@(0xC3,0xA2,0xC2,0x80,0xC2,0x93); New = [byte[]]@(0xE2,0x80,0x93) },
    # Double-encoded em-dash (C3 A2 C2 80 C2 94)
    @{ Old = [byte[]]@(0xC3,0xA2,0xC2,0x80,0xC2,0x94); New = [byte[]]@(0xE2,0x80,0x94) },
    # Double-encoded right single quote (â€™) 
    @{ Old = [byte[]]@(0xC3,0xA2,0xE2,0x82,0xAC,0xE2,0x84,0xA2); New = [byte[]]@(0x27) },
    # Double-encoded left single quote (â€˜)
    @{ Old = [byte[]]@(0xC3,0xA2,0xE2,0x82,0xAC,0xCB,0x9C); New = [byte[]]@(0x27) },
    # Corrupted ₹ sign (â‚¹)
    @{ Old = [byte[]]@(0xC3,0xA2,0xE2,0x80,0x9A,0xC2,0xB9); New = [byte[]]@(0x52,0x73,0x2E) },  # Rs.
    # Corrupted ² (Â²) 
    @{ Old = [byte[]]@(0xC3,0x82,0xC2,0xB2); New = [byte[]]@(0xC2,0xB2) }
)

foreach ($file in $tsFiles) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $originalLen = $bytes.Length
    $modified = $false
    
    foreach ($pattern in $patterns) {
        $newBytes = Replace-ByteSequence -Source $bytes -Old $pattern.Old -New $pattern.New
        if ($newBytes.Length -ne $bytes.Length) {
            $bytes = $newBytes
            $modified = $true
        } elseif (-not [System.Linq.Enumerable]::SequenceEqual([byte[]]$bytes, [byte[]]$newBytes)) {
            $bytes = $newBytes
            $modified = $true
        }
    }
    
    if ($modified) {
        [System.IO.File]::WriteAllBytes($file.FullName, $bytes)
        $totalFixed++
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host "`nTotal files fixed: $totalFixed"
