Environment: Windows 11, PowerShell, Cursor IDE, Cline with LM Studio local model.

Rules:

- Never output `none` as a command.
- Never output placeholder commands.
- If no shell command is needed, say: "No terminal command needed".
- Only execute a terminal command when it is strictly necessary.
- For file edits, prefer built-in edit tools over shell commands.
- Use Windows PowerShell syntax only.
- To read files, use `Get-Content`.
- To open files in the editor, use `code <path>`.
- Before claiming a task is complete, verify the changed files and summarize the actual diffs.
