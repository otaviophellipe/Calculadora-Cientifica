#! p3
"""
Build script to compile SASS and TypeScript files for the calculator project.
Requires: sass, typescript (install via npm if needed)
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Run a shell command and handle errors."""
    print(f"Running: {description}")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"Success: {description}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: {description}")
        print(f"Command: {command}")
        print(f"Error output: {e.stderr}")
        return False

def main():
    """Main build function."""
    print("Starting build process...")

    # checa sass
    try:
        subprocess.run(["sass", "--version"], check=True, capture_output=True)
        sass_available = True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Warning: SASS not found. Installing via npm...")
        if not run_command("npm install -g sass", "Installing SASS globally"):
            print("Failed to install SASS. Please install manually: npm install -g sass")
            sass_available = False
        else:
            sass_available = True

    # checa instalações tsc
    try:
        subprocess.run(["tsc", "--version"], check=True, capture_output=True)
        tsc_available = True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Warning: TypeScript not found. Installing via npm...")
        if not run_command("npm install -g typescript", "Installing TypeScript globally"):
            print("Failed to install TypeScript. Please install manually: npm install -g typescript")
            tsc_available = False
        else:
            tsc_available = True

    # comp sass
    if sass_available and os.path.exists("style.scss"):
        if not run_command("sass style.scss style.css", "Compiling SASS to CSS"):
            print("SASS compilation failed.")
        else:
            print("SASS compiled successfully.")

    # comp ts
    if tsc_available and os.path.exists("logic.ts"):
        if not run_command("tsc logic.ts --outFile logic.js --target ES2015", "Compiling TypeScript to JavaScript"):
            print("TypeScript compilation failed.")
        else:
            print("TypeScript compiled successfully.")

    print("Build process completed.")

if __name__ == "__main__":
    main()
