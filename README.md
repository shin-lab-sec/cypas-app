# cypas-app

Cypas におけるユーザー演習アプリの役割を持ったリポジトリ

## 演習イメージ

コース選択画面
![image](https://github.com/shin-lab-sec/cypas-app/assets/65057976/618d8453-fffd-4658-8d3b-0af70e49d8b2)

ターミナル（Web ブラウザ経由）
![image](https://user-images.githubusercontent.com/65057976/204196908-12f6f64c-2437-4800-8402-5401f89523e3.png)

仮想デスクトップ（Web ブラウザ経由）
![image](https://user-images.githubusercontent.com/65057976/204194235-e33f904f-e498-4c1f-bb17-7cef8a78fa81.png)

## 開発環境準備

### step1 リポジトリをクローン

```
git clone https://github.com/shin-lab-sec/cypas-app.git
```

### step2 .env ファイル更新

.env ファイルの`#host`部分を更新する(push はせずにローカルで書き換えるようにする)
デフォルトで.env を読み込むソフトウェアが多いので、全ての環境で`.env`という命名になっている。環境によって上書きして読み込む。

### step3 cypas-local-tls-proxy 起動

起動方法は[cypas-local-tls-proxy](https://github.com/shin-lab-sec/cypas-local-tls-proxy)を参照

### step4 コンテナ起動

```
docker compose up
```

### step5 コンテナ接続

コンテナ起動後は vscode で nextjs コンテナに接続（基本作業はコンテナ内）

## 本番用 docker compose up

.env ファイルを上書きした後

```
docker compose -f docker-compose.prod.yml up --build
```
