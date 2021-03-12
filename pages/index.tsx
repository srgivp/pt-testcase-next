import {wrapper} from "../redux/store";
import ROUTES from "../routes/routes-constants";
import atob from 'atob';
import nookies from 'nookies';


export const getServerSideProps = wrapper.getServerSideProps(
    (ctx) => {
      const allCookies = nookies.get(ctx);
      const shallowCookies = JSON.parse(JSON.stringify(allCookies));
      const {token} = shallowCookies;

        function parseJwt (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''))

            return JSON.parse(jsonPayload);
        };
        let tokenPayload;
        if (token) {
            tokenPayload = parseJwt(token);
        }
        if (ctx.res){
            token && tokenPayload.exp*1000 > Date.now() ? ctx.res.writeHead(302, {location: `${ROUTES.dynamic.usersPage(1)}`}) : ctx.res.writeHead(302, {location: `${ROUTES.signIn}`});
            ctx.res.end();
        }
    })

const Home = () => {
  return <></>;
}
export default Home;

