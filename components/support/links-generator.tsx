import Link from 'next/link';
import ROUTES from '../../routes/routes-constants';
import { usersOnPage } from './utils';

const linksGenerator = (n: number): JSX.Element[] => {
  let linksArr: Array<JSX.Element> | [] = [];
  let pagesQuantity = Math.floor(n / usersOnPage);
  if (n > pagesQuantity * usersOnPage) {
    pagesQuantity++;
  }
  for (let j = 1; j < pagesQuantity + 1; j++) {
    const link: JSX.Element = (
      <Link key={`link-to-${j + 1}`} href={ROUTES.dynamic.usersPage('[number]')} as={ROUTES.dynamic.usersPage(j)}>
        <a className="page-number">{j}</a>
      </Link>
    );
    linksArr = [...linksArr, link];
  }
  return linksArr;
};

export default linksGenerator;
