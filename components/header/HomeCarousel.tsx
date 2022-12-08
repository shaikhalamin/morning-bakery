import { Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item
        interval={2000}
        style={{
          minHeight: "450px",
          height: "100%",
        }}
      >
        
        <Row>
          <Col
            className="py-0"
            style={{
              backgroundImage:
                "url(" +
                `https://res.cloudinary.com/deundpsr2/image/upload/v1670423760/bakery/category_local/ndeiztik5pwshyc5tvp3.png` +
                ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "450px",
              height: "100%",
            }}
          />
        </Row>

        <Carousel.Caption>
          <h3 className="text-dark">First slide label</h3>
          <p className="text-dark">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Row>
          <Col
            className="py-0"
            style={{
              backgroundImage:
                "url(" +
                `https://res.cloudinary.com/deundpsr2/image/upload/v1670501580/bakery/category_local/lb1vxjtf7cz3stpeeidf.jpg` +
                ")",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "450px",
              height: "100%",
            }}
          />
        </Row>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Row>
          <Col
            className="py-0"
            style={{
              backgroundImage:
                "url(" +
                `https://res.cloudinary.com/deundpsr2/image/upload/v1670501513/bakery/category_local/jbkslm4vvevba31q4gfh.jpg` +
                ")",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "450px",
              height: "100%",
            }}
          />
        </Row>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
