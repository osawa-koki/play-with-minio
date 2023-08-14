# play-with-minio

❤️‍🔥❤️‍🔥❤️‍🔥 MinIOを使用してローカル環境でS3オブジェクトストレージを構築する！  

## 実行方法

まずは、MinIOを起動します。  
以下のコマンドを実行してください。  

```shell
docker-compose up -d
```

これでMinIOが起動します。  
初回起動時に`./init_data/`ディレクトリにあるファイルがS3にアップロードされます。  

次にNode.jsを使用してMinIOにアクセスします。  
以下のコマンドを実行してください。  

```shell
yarn install
yarn start
```

これでファイル一覧の出力とファイルアップロードが実行されます。  
`.env.example`ファイルを`.env`にリネームして、各種環境変数を設定してください。  

---

また、`http://localhost:9000`にアクセスするとMinIOの管理画面にアクセスできます。  
オブジェクトブラウザからアップロードされたファイルを確認できます。  

## イロイロ説明

MinIOはGo言語で実装されている、軽量で高速なオブジェクトストレージです。  
軽量であるため、ローカル環境での開発にも適しています。  

また、AWSのストレージングサービスであるS3と互換性があります。  
したがって、S3のSDKを使用してMinIOにアクセスすることができます。  

## 参考

- [Developers IO](https://dev.classmethod.jp/articles/minio-docker-compose/)
