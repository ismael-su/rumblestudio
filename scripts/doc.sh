echo "Which lib you want to add doc"

read NAME

cd "../libs/$NAME"

npx typedoc --out "../../docs/docs/$NAME" "./src/index.ts"
