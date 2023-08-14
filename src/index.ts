import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import dayjs from 'dayjs'

(async () => {
  const prefixes = [
    'cool',
    'great',
    'awesome',
    'nice',
    'wonderful',
    'fantastic',
    'amazing',
    'excellent',
    'fabulous',
    'splendid',
    'superb',
    'terrific',
    'incredible',
    'outstanding',
    'exceptional',
    'perfect',
    'marvelous',
    'phenomenal',
    'brilliant'
  ]
  const animals = [
    'dog',
    'cat',
    'rabbit',
    'hamster',
    'goldfish',
    'turtle',
    'parrot',
    'cockatiel',
    'canary',
    'budgerigar',
    'chicken',
    'duck',
    'goose',
    'pigeon',
    'turkey',
    'quail',
    'guinea pig',
    'chinchilla',
    'sugar glider',
    'hedgehog'
  ]
  const getRandomName = (): string => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const animal = animals[Math.floor(Math.random() * animals.length)]
    return `${prefix} ${animal}`
  }

  dotenv.config()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const AWS_REGION = process.env.AWS_REGION!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!

  // S3 クライアントを作成。
  const client = new S3Client({
    region: AWS_REGION
  })

  // ファイル一覧を取得。
  const listFiles = async (): Promise<void> => {
    console.log('===== ===== ===== ===== ===== ===== =====')
    console.log('===== ===== Listing files ===== =====')
    console.log('===== ===== ===== ===== ===== ===== =====')
    const params = {
      Bucket: S3_BUCKET_NAME
    }
    try {
      const data = await client.send(new ListObjectsCommand(params))
      console.log('Files:')
      data.Contents?.forEach((content) => {
        console.log(`- ${content.Key as string}`)
      })
    } catch (error) {
      throw new Error('Failed to list files.')
    }
  }
  await listFiles()

  // バケットにファイルをアップロード。
  const uploadFile = async (): Promise<void> => {
    console.log('===== ===== ===== ===== ===== ===== =====')
    console.log('===== ===== Uploading file ===== =====')
    console.log('===== ===== ===== ===== ===== ===== =====')
    const key = `${dayjs().format('YYYYMMDDHHmmss')}.txt`
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: JSON.stringify({
        message: getRandomName(),
        timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }
    try {
      await client.send(new PutObjectCommand(params))
      console.log(`Uploaded: ${key}`)
    } catch (error) {
      throw new Error(`Failed to upload file: ${key}`)
    }
  }
  await uploadFile()

  // ファイルの中身を取得。
  const getFile = async (): Promise<void> => {
    console.log('===== ===== ===== ===== ===== ===== =====')
    console.log('===== ===== Getting file ===== =====')
    console.log('===== ===== ===== ===== ===== ===== =====')
    try {
      // ファイル一覧を取得。
      const files = await client.send(new ListObjectsCommand({
        Bucket: S3_BUCKET_NAME
      }))
      // ファイルの中身を取得。
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      files.Contents?.forEach(async (content): Promise<void> => {
        const params = {
          Bucket: S3_BUCKET_NAME,
          Key: content.Key as string
        }
        const data = await client.send(new GetObjectCommand(params))
        const file = await data.Body?.transformToString()
        if (file == null) throw new Error('Failed to get file.')
        console.log(`- ${content.Key as string}: ${file}`)
      })
    } catch (error) {
      throw new Error('Failed to get file.')
    }
  }
  await getFile()
})()
  .then(() => {
    console.log('Done.')
  })
  .catch((error: Error) => {
    console.error('Failed.')
    if (error instanceof Error) console.error(`ERROR: ${error.message}`)
  })
