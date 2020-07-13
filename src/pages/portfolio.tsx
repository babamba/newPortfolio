import React, { FunctionComponent } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import styled from 'styled-components';

// import TouchCarousel from 'react-touch-carousel';
// import Slider from 'react-slick';
import { ForwardOutlined, BackwardOutlined } from '@ant-design/icons';
import Carousel from 'react-multi-carousel';

const FolioContainer = styled(Card)`
  /* height:%; */
  overflow: hidden;
  border-radius: 12px !important;
`;

const FolioRadius = styled.div`
  border-radius: 20px;
`;
const FolioDiv = styled.div``;

const FolioImg = styled.img`
  width: 100%;
  height: 100%;
`;

type Props = {};
const Portfolio: FunctionComponent<Props> = ({}) => {
  const responsive = {
    superLargeDevice: {
      breakpoint: { max: 4000, min: 1920 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1920, min: 1634 },
      items: 1,
      slidesToSlide: 1,
    },
    labtop: {
      breakpoint: { max: 1633, min: 769 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 565 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 1,
    },
  };

  // const arrowStyle = {
  //   background: 'transparent',
  //   border: 0,
  //   color: '#fff',
  //   fontSize: '80px',
  // };

  const CustomRightArrow = (props: any) => {
    return (
      <Button className="carousel-arrow right" onClick={props.onClick}>
        <ForwardOutlined style={{ fontSize: 24 }} />
      </Button>
    );
  };

  const CustomLeftArrow = (props: any) => {
    return (
      <Button className="carousel-arrow left" onClick={props.onClick}>
        <BackwardOutlined style={{ fontSize: 24 }} />
      </Button>
    );
  };

  // const settings = {
  //   // dots: true,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   vertical: true,
  //   verticalSwiping: true,
  //   // className: 'center',
  //   // centerMode: true,
  //   // dotPosition: 'left',
  //   beforeChange: function (currentSlide, nextSlide) {
  //     console.log('before change', currentSlide, nextSlide);
  //   },
  //   afterChange: function (currentSlide) {
  //     console.log('after change', currentSlide);
  //   },
  // };

  return (
    <FolioContainer>
      <Carousel
        containerClass="carousel-container"
        centerMode={false}
        // centerMode={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        swipeable={true}
        draggable={true}
        infinite={true}
        responsive={responsive}
        // draggable={true}
        showDots={true}

        // dotListClass="carousel-dot-container"
        // itemClass="search carousel-item"
        // //
        // containerClass="carousel-container"
        // sliderClass="search carousel-slide"
      >
        <FolioDiv>
          <FolioImg alt="텔레매틱스" src="/static/images/folio/tele.png" />
        </FolioDiv>
        <FolioDiv>
          <FolioImg alt="키즈랜드" src="/static/images/folio/kidsland.png" />
        </FolioDiv>
        <FolioDiv>
          <FolioImg alt="청약센터" src="/static/images/folio/gicoapart.png" />
        </FolioDiv>
        <FolioDiv>
          <FolioImg alt="오산백년" src="/static/images/folio/osan.png" />
        </FolioDiv>
        <FolioDiv>
          <FolioImg alt="충남대동력" src="/static/images/folio/cnuweb.png" />
        </FolioDiv>
        <FolioDiv>
          <FolioImg alt="봉군웹" src="/static/images/folio/beeweb.png" />
        </FolioDiv>
        <FolioDiv>
          <FolioImg alt="봉군앱" src="/static/images/folio/beeapp.png" />
        </FolioDiv>
      </Carousel>
    </FolioContainer>
  );
};

export default Portfolio;
