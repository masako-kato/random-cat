import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
}

const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // },[]);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  }
  return (
    <div className={styles.page}>
      <button type="button" onClick={handleClick} className={styles.button}>他のにゃんこも見る</button>
      <div className={styles.frame}>{loading || <img src={imageUrl} className={styles.img} />}</div>
    </div>
  );
}
// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
}

export default IndexPage;
type Image = {
  url: string;
}
const fetchImage = async (): Promise<Image> => {
  const request = await fetch('https://api.thecatapi.com/v1/images/search');
  const images = await request.json();
  console.log(images);
  return images[0];
}
