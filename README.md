# cyber-range-client

テーマ「クラウドベースのセキュリティ演習」の client 側のリポジトリ

## 開発環境準備

### step1

リポジトリをクローン

```
git clone https://github.com/shin-lab-sec/cyber-range-client.git
```

### step2

ライブラリをインストール

```
yarn
```

### step3

nextjs と mysql のコンテナ起動

```
docker compose up
```

### step4

コンテナ起動後は vscode で nextjs コンテナに接続（基本作業はコンテナ内）

### step5

初回の場合は db の migrate をする

```
npx prisma migrate dev --name init
```
