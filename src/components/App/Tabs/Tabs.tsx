import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { Typography, Card } from 'antd';
import { Link, withRouter, RouteComponentProps, BrowserRouter as Router } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useWindowSize from '../../../hooks/useWindow';
import styled, { keyframes } from 'styled-components';
import useStores from '../../../hooks/useStores';

const Gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LinkText = styled.span`
  color: ${props => (props.theme ? '#345' : 'white')};
  @media only screen and (min-width: 200px) and (max-width: 767px) {
    font-size: 20px;
  }
  @media only screen and (min-width: 768px) and (max-width: 4000px) {
    font-size: 38px;
  }
`;

const GradientFont = styled.span`
  background: linear-gradient(-60deg, #ebe650, #cfeb50, #23d5ab, #22c1c3, #23a6d5);
  background-size: 200% 200%;
  /* background: linear-gradient(to right, #fbcac9, #8ca6ce); */
  /*  */
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 2px;

  animation: ${props => props.isCurrent && `Gradient 5s ease infinite alternate`};
`;

const ContentArea = styled.div`
  opacity: ${props => (props.current ? 1 : 0.3)};
  transition: opacity 1s ease 0s;
  @media only screen and (min-width: 200px) and (max-width: 767px) {
    padding: 20px;
  }
  @media only screen and (min-width: 768px) and (max-width: 4000px) {
    padding: 30px;
  }
`;
interface Props extends RouteComponentProps<any> {}
//const Dynamic: NextPage<PostPageProps, any> = (props: PostPageProps) => {
const Dynamic: FunctionComponent<Props> = (props: Props) => {
  const { history, match } = props;
  const size = useWindowSize();
  const slideContentRef = useRef<any>(null);
  const slideTitleRef = useRef<any>(null);
  const [isInit, setIsInit] = useState(false);
  const {
    common: { useDark }
  } = useStores();

  // const [slideIndex, setSlideIndex] = useState(0);

  const getPageIdx = () => {
    let pageNum = 0;
    const pathname = history.location.pathname.split('/');
    if (pathname[1] === 'portfolio') {
      pageNum = 1;
    } else if (pathname[1] === 'resume') {
      pageNum = 2;
    } else if (pathname[1] === 'contact') {
      pageNum = 3;
    } else if (pathname[1] === 'blog') {
      pageNum = 4;
    } else if (pathname[1] === 'about') {
      pageNum = 0;
    } else {
      pageNum = 0;
    }

    return pageNum;
  };

  const [topNav, setTopNav] = useState(null);
  const [currentPageIdx, setCurrentPageIdx] = useState(getPageIdx());
  const [titlePadding, setTitlePadding] = useState(20);

  useEffect(() => {
    if (size.width !== undefined) {
      if (size.width < 400) {
        setTitlePadding(0);
      }
      if (size.width < 768) {
        setTitlePadding(0);
      } else if (size.width < 1176) {
        setTitlePadding(20);
      } else {
        setTitlePadding(20);
      }
    }
  }, [size]);

  // const sliderContentSettings = {
  //   className: 'center',
  //   rtl: false,
  //   // dots: true,
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: `${contentCenterPadding}px`,
  //   slidesToShow: 1,
  //   speed: 500,
  //   swipe: false,
  //   swipeToSlide: false,
  //   //focusOnSelect: false,
  //   arrows: false
  // };

  // useEffect(() => {
  //   catchPage();
  //   generateMeta();
  // }, []);

  useEffect(() => {
    catchPage();
    setIsInit(true);
  }, [history.location.pathname]);

  const catchPage = async () => {
    const num = await getPageNum();
    slideTitleRef.current.slickGoTo(num);
  };

  const getPageNum = async () => {
    let number = 0;
    const pathname = history.location.pathname.split('/');

    if (pathname[1] === 'about') {
      number = 0;
    } else if (pathname[1] === 'portfolio') {
      number = 1;
    } else if (pathname[1] === 'resume') {
      number = 2;
    } else if (pathname[1] === 'contact') {
      number = 3;
    } else if (pathname[1] === 'blog') {
      number = 4;
    } else {
      number = 0;
    }

    await setCurrentPageIdx(number);

    return number;
  };

  const swipePageNum = async (next: number) => {
    if (next === 0) history.push('/about');
    else if (next === 1) history.push('/portfolio');
    else if (next === 2) history.push('/resume');
    else if (next === 3) history.push('/contact');
    else if (next === 4) history.push('/blog');
    else history.push('/');

    setCurrentPageIdx(next);
  };

  const sliderTitleSettings = {
    rtl: false,
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: `${titlePadding}px`,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 600,
    swipe: size.width !== undefined && size.width > 768 ? false : true,
    swipeToSlide: size.width !== undefined && size.width > 768 ? false : true,
    focusOnSelect: true,
    arrows: false,
    beforeChange: (current, next) => {
      swipePageNum(next);
    }
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          opacity: 1,
          margin: size.width !== undefined && size.width > 768 ? '0 5rem' : '0'
        }}
        bodyStyle={{
          padding: 4
        }}
      >
        {/* {size !== null && size > 768 && (
          <div style={{ float: 'left', paddingTop: 12, paddingLeft: 12 }}>
            <Typography.Paragraph
              style={{
                fontSize: '1em',
                margin: '.1em',
                display: 'inline-block',
                fontStyle: 'italic',
                padding: '6px 10px',
                background: '#faf46a',
                color: 'rgba(51, 68, 85,.7)',
                borderRadius: 4,
                lineHeight: 1,
                width: '100%',
                textAlign: 'center'
              }}
            >
              JW
              <Avatar size={30} src="/static/images/me.png" style={{ marginLeft: 10 }} />
            </Typography.Paragraph>
          </div>
        )} */}

        {/* <Layout.Header
          className="header"
          style={{
            background: 'transparent !important',
            width: `${titleCenterPaddingPer}%`,
            margin: '0 auto'
          }}
        > */}
        <Slider ref={slideTitleRef} {...sliderTitleSettings}>
          <div onClick={e => history.push('/about')}>
            <Typography.Paragraph
              style={{
                textAlign: 'center',
                letterSpacing: '-2px',
                marginBottom: 0,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '2.7em',
                opacity: currentPageIdx === 0 ? 1 : 0.5,
                transition: 'opacity 0.3s ease 0s'
              }}
            >
              <Link to="/about">
                <LinkText theme={useDark}>
                  <GradientFont isCurrent={currentPageIdx === 0}>About</GradientFont>
                </LinkText>
              </Link>
            </Typography.Paragraph>
          </div>
          <div onClick={e => history.push('/portfolio')}>
            <Typography.Paragraph
              style={{
                textAlign: 'center',
                letterSpacing: '-2px',
                marginBottom: 0,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '2.7em',
                opacity: currentPageIdx === 1 ? 1 : 0.5,
                transition: 'opacity 0.3s ease 0s'
              }}
            >
              <Link to="/portfolio">
                <LinkText theme={useDark}>
                  <GradientFont isCurrent={currentPageIdx === 1}>Portfolio</GradientFont>
                </LinkText>
              </Link>
            </Typography.Paragraph>
          </div>

          <div onClick={e => history.push('/resume')}>
            <Typography.Paragraph
              style={{
                textAlign: 'center',
                letterSpacing: '-2px',
                marginBottom: 0,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '2.7em',
                opacity: currentPageIdx === 2 ? 1 : 0.5,
                transition: 'opacity 0.3s ease 0s'
              }}
            >
              <Link to="/resume">
                <LinkText theme={useDark}>
                  <GradientFont isCurrent={currentPageIdx === 2}>Resume</GradientFont>
                </LinkText>
              </Link>
            </Typography.Paragraph>
          </div>
          <div onClick={e => history.push('/contact')}>
            <Typography.Paragraph
              style={{
                textAlign: 'center',
                letterSpacing: '-2px',
                marginBottom: 0,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '2.7em',
                opacity: currentPageIdx === 3 ? 1 : 0.5,
                transition: 'opacity 0.3s ease 0s'
              }}
            >
              <Link to="/contact">
                <LinkText theme={useDark}>
                  <GradientFont isCurrent={currentPageIdx === 3}>Contact</GradientFont>
                </LinkText>
              </Link>
            </Typography.Paragraph>
          </div>

          <div onClick={e => history.push('/blog')}>
            <Typography.Paragraph
              style={{
                textAlign: 'center',
                letterSpacing: '-2px',
                marginBottom: 0,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '2.7em',
                opacity: currentPageIdx === 4 ? 1 : 0.5,
                transition: 'opacity 0.3s ease 0s'
              }}
            >
              <Link to="/blog">
                {/* <a onClick={e => history.push('/blog')}> */}
                <LinkText theme={useDark}>
                  <GradientFont isCurrent={currentPageIdx === 4}>Blog</GradientFont>
                </LinkText>
              </Link>
            </Typography.Paragraph>
          </div>
        </Slider>
        {/* </Layout.Header> */}
      </Card>
    </>
  );
};

export default withRouter(Dynamic);
