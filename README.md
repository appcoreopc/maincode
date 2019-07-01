# maincode


To add a subtree 

git remote add extlibrary https://github.com/appcoreopc/librepository.git
git subtree add —-prefix=vendor/ extlibrary master


To remove subtree - assets is the name of my subtree i created earlier 

git filter-branch --index-filter 'git rm --cached --ignore-unmatch -rf assets' --prune-empty -f HEAD


