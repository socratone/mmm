import { getPostsInfinite } from '../../libs/firebase/apis';
import useSWRInfinite from 'swr/infinite';
import { Post } from '../../libs/firebase/interfaces';
import { useEffect, useState } from 'react';

const getKey = (pageIndex: number, previousPageData: Post[]) => {
  if (previousPageData && !previousPageData.length) return null; // 끝에 도달
  const endPost = previousPageData?.[previousPageData.length - 1];
  return [endPost?.createdAt, 'posts']; // 키
};

const usePostsInfinite = () => {
  const [isEnded, setIsEnded] = useState(false);

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    getPostsInfinite
  );

  useEffect(() => {
    if (data?.[data.length - 1].length === 0) {
      setIsEnded(true);
    } else {
      setIsEnded(false);
    }
  }, [data]);

  const getPosts = () => {
    if (!data) return [];
    return data.reduce((previous, current) => {
      return previous.concat(current);
    }, []);
  };

  return {
    posts: getPosts(),
    size,
    setSize,
    isLoading: !error && !data,
    isError: error,
    isEnded,
  };
};

export default usePostsInfinite;
