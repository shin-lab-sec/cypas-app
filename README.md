# cyber-range-client

テーマ「クラウドベースのセキュリティ演習」の client 側のリポジトリ

## 演習イメージ

ターミナル（Web ブラウザ経由）
![image](https://user-images.githubusercontent.com/65057976/204196908-12f6f64c-2437-4800-8402-5401f89523e3.png)

仮想デスクトップ（Web ブラウザ経由）
![image](https://user-images.githubusercontent.com/65057976/204194235-e33f904f-e498-4c1f-bb17-7cef8a78fa81.png)

## 開発環境準備

### step1 リポジトリをクローン

```
git clone https://github.com/shin-lab-sec/cyber-range-client.git
```

### step2 .env 作成

.env.example を参考に.env ファイルを作成する

### step3 cypas-local-tls-proxy 起動

起動方法は[cypas-local-tls-proxy](https://github.com/shin-lab-sec/cypas-local-tls-proxy)を参照

### step4 コンテナ起動

```
docker compose up
```

### step5 コンテナ接続

コンテナ起動後は vscode で nextjs コンテナに接続（基本作業はコンテナ内）
