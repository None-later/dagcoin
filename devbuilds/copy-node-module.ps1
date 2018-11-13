
$currentProjectDirectory = (Get-Item -Path ".\" -Verbose).FullName

# Copy-Item -Path "$($currentProjectDirectory)\node_modules" -Destination ..\byteballbuilds\DagWallet\win32\ -recurse -Force
Copy-Item -Path "$($currentProjectDirectory)\node_modules" -Destination ..\byteballbuilds\DagWallet\win64\ -recurse -Force

