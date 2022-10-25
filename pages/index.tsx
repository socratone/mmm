import { Container } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NavigationFooter from '../components/NavigationFooter';
import PostCard from '../components/PostCard';
import { getPosts } from '../libs/firebase/apis';

type Book = '창세';

type Item = {
  id: string;
  name: string;
  isLiked: boolean;
  text: string;
  book: Book;
  startedChapter: number;
  startedVerse: number;
  endedChapter?: number;
  endedVerse?: number;
  content: string;
};

const items: Item[] = [
  {
    id: '0',
    name: '손오공',
    book: '창세',
    isLiked: true,
    startedChapter: 1,
    startedVerse: 1,
    text: '한처음에 하느님께서 하늘과 땅을 창조하셨다.',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dolor unde amet ex! Voluptatum, laboriosam. Soluta totam, facilis error, unde pariatur sapiente eligendi ea blanditiis tempore culpa iste itaque natus corporis quam ipsum sequi incidunt harum fugit voluptate distinctio praesentium, suscipit doloribus atque vero? Quam pariatur, atque a nihil molestiae nostrum corporis explicabo repellendus optio porro mollitia harum laudantium ab esse adipisci deleniti. Excepturi aliquam repellendus numquam cupiditate temporibus accusamus reprehenderit ex, fugiat accusantium delectus ut unde molestiae aut tempora asperiores ipsum iste perspiciatis inventore soluta? Vel, eligendi natus! Eveniet aliquam illum delectus? Ea, veritatis repudiandae odit impedit praesentium at dolorum voluptatem alias delectus asperiores cumque libero neque fuga quos suscipit perferendis rem laborum fugiat vitae deserunt iusto, magnam dolor. Itaque, libero consectetur harum esse, laboriosam voluptatum qui temporibus velit dolore praesentium odio modi distinctio fugiat. Odit maiores quia consequatur, neque quo iure dolorum dignissimos tempore numquam pariatur perspiciatis modi provident ad obcaecati a unde nemo reprehenderit doloremque reiciendis autem ullam ipsum voluptatem, quasi sequi. Inventore nulla quia tempora temporibus eos provident assumenda consequuntur, vero eius placeat voluptatibus odit harum cum dolor vel. Voluptates optio animi quia ullam, neque nulla impedit veritatis aut minus omnis, vitae eum aliquid, odio voluptatem.',
  },
  {
    id: '1',
    name: '사오정',
    book: '창세',
    isLiked: true,
    startedChapter: 1,
    startedVerse: 1,
    text: '한처음에 하느님께서 하늘과 땅을 창조하셨다.',
    content: '하나 두울\n셋 넷',
  },
  {
    id: '2',
    book: '창세',
    name: '저팔계',
    isLiked: false,
    startedChapter: 1,
    startedVerse: 2,
    endedChapter: 1,
    endedVerse: 3,
    text: '땅은 아직 꼴을 갖추지 못하고 비어 있었는데, 어둠이 심연을 덮고 하느님의 영이 그 물 위를 감돌고 있었다. 하느님께서 말씀하시기를 “빛이 생겨라.” 하시자 빛이 생겼다.',
    content: '내 나이프 내놓으셔!',
  },
];

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/public');
  }, [router]);

  useEffect(() => {
    getPosts()
      .then((posts) => console.log('posts:', posts))
      .catch();
  }, []);

  const getPhrase = (
    text: string,
    book: Book,
    startedChapter: number,
    startedVerse: number,
    endedChapter?: number,
    endedVerse?: number
  ) => {
    if (endedChapter && endedVerse) {
      if (startedChapter === endedChapter) {
        return `${text} (${book} ${startedChapter},${startedVerse}-${endedVerse})`;
      }

      return `${text} (${book} ${startedChapter},${startedVerse}-${endedChapter},${endedVerse})`;
    }

    return `${text} (${book} ${startedChapter},${startedVerse})`;
  };

  return (
    <>
      <Head>
        <title>머물음</title>
        <meta name="description" content="머물음 웹" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="sm" sx={{ px: 0 }}>
        {items.map((item) => (
          <PostCard
            key={item.id}
            name={item.name}
            phrase={getPhrase(
              item.text,
              item.book,
              item.startedChapter,
              item.startedVerse,
              item?.endedChapter,
              item?.endedVerse
            )}
            content={item.content}
            isLiked={item.isLiked}
          />
        ))}
      </Container>

      <NavigationFooter />
    </>
  );
};

export default Home;
