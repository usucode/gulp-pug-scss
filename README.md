# gulp-pug-stylus の構築

## 技術

- gulp
- pug
- scss

## How to use

クローンしたあと

```bash
# yarn
yarn
yarn start
yarn build
yarn clean #Windowsの場合は削除コマンド変更

# npm(yarnがない人)
npm install
npm run start
npm run build
npm run clean #Windowsの場合は削除コマンド変更
```

## Pug のコンポーネント追加

- `/views/components`のディレクトリに`_[component name].pug`でファイルを追加する
  中身は全て mixin で書く(理由は使いたい時だけ出したいから)

- `/views/layouts/_[layout name].pug`に以下のコードを追加(拡張子はいらない)

```pug
include ../components/_[component name]
```

- あとは`/views`ディレクトリ直下のテンプレートで記述した mixin を取り出して使用する
