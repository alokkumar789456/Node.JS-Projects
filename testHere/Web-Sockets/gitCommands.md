# to Not include files you can create a file named .gitignore and add paths to it (ex: node_modules/ )
# In vsCode if you see file explorer, files in Green then those are not yet committed
# In vsCode if you see file explorer, files in Orange then those are tracked and Changes have been done in that file and not committed

-- Step wise (from first)
initialize a new repo in project 
# cmd : git init
create .gitignore and files to followed by (filname) or (foldername/)
check files status 
# cmd : git status
now add files 
# cmd : git add /path
# cmd : git add . (adds all untracked files)
Commit the Added files 
# cmd : git commit -m "Files added using commit"
--Done
To now track those files and commit the updates
Check Folder status (
    tracked - have been added but not committed.
    untracked - not Added.
    Staged: Changes are ready to be committed.
    Unstaged: Changes are not yet ready to be committed.
    )
# cmd : git status
add files 
# cmd : git add /path
# cmd : git add . (adds all untracked files)
to Commit the added files 
# cmd : git commit -m "message about commit"
--Other commands 
to check the version 
# cmd : git --version
to Clone the repo 
# cmd : git clone (git_url)
If you want to link your local repository to a remote one on GitHub
# cmd : git remote add origin (git_url)

update your local repo from git repo
If your branch is main, the command would be:
# git pull origin main
Use the git pull command to fetch and merge changes from the remote repository.
# git pull origin branch-name
some cases its *master