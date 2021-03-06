import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
// import loadable from '@loadable/component';

import About from '../pages/about';
import Blog from '../pages/blog';
import BlogDetail from '../pages/blog-detail';
import Contact from '../pages/contact';
import Portfolio from '../pages/portfolio';
import Resume from '../pages/resume';
// import NoMatch from '../pages/404';
import { AnimatePresence } from 'framer-motion';

// const AboutComponent = loadable(() => import('../pages/about'));
import LazyLoader from '../components/Loader/LazyLoader';
const BlogComponent = React.lazy(() => import('../pages/blog'));
const BlogDetailComponent = React.lazy(() => import('../pages/blog-detail'));
const ContactComponent = React.lazy(() => import('../pages/contact'));
const PortfolioComponent = React.lazy(() => import('../pages/portfolio'));
const ResumeComponent = React.lazy(() => import('../pages/resume'));

// const AboutComponent = loadable(() => import('../pages/about'));
// const BlogComponent = loadable(() => import('../pages/blog'));
// const BlogDetailComponent = loadable(() => import('../pages/blog-detail'));
// const ContactComponent = loadable(() => import('../pages/contact'));
// const PortfolioComponent = loadable(() => import('../pages/portfolio'));
// const ResumeComponent = loadable(() => import('../pages/resume'));
// const NoMatchComponent = loadable(() => import('../pages/404'));
// 전역에서 사용되는 브라우저 라우터

const FolioRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <React.Suspense
        fallback={
          <div>
            <LazyLoader />
          </div>
        }
      >
        <Switch location={location} key={location.pathname}>
          {/* exact 대신 매칭되는 첫번째 라우트만 보여주고 나머지는 보여주지 않는다.
           * 주의점 : 비교 할 라우트를 위에 작성해야 한다.
           *  만약에 /statistics 을 /statistics/searchDetail 보다 위에 넣어준다면,
           *  상세화면이 라우팅 되지 않는다.
           */}

          {/* <Route path="/about" exact={true} component={About} /> */}
          <Route path={['/', '/about']} exact component={About} />
          <Route path="/portfolio" exact={true} component={PortfolioComponent} />
          <Route path="/contact" exact={true} component={ContactComponent} />
          <Route path="/resume" exact={true} component={ResumeComponent} />
          <Route path="/blog" exact={true} component={BlogComponent} />
          <Route path="/blog/:id" exact={true} component={BlogDetailComponent} />
          {/* <Route path="/portfolio" exact={true} component={Portfolio} />
          <Route path="/contact" exact={true} component={Contact} />
          <Route path="/resume" exact={true} component={Resume} />
          <Route path="/blog" exact={true} component={Blog} />
          <Route path="/blog/:id" exact={true} component={BlogDetail} /> */}
          {/* <Route path={['/blog/:id', '/blog']} component={Blog} /> */}

          <Redirect path="*" to="/" />
          {/* <Redirect to="/about" from="/" /> */}
          {/*  */}
          {/* <Route component={NoMatchComponent} /> */}
        </Switch>
      </React.Suspense>
    </AnimatePresence>
  );
};

export default FolioRoutes;
