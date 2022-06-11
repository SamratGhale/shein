import { alpha, styled } from "@mui/material/styles";
import { findIndex } from "lodash";
import { Box } from "@mui/material";
import Slider from 'react-slick';
import { useState, useRef, useEffect } from "react";
import { CLOTHES_IMAGE } from '../../../constants/api.js';
import LightboxModal from "../../../components/LightboxModal.js";
import { CarouselControlsArrowsIndex } from '../../../components/carousel'

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
    '& .slick-slide': {
        float: theme.direction === 'rtl' ? 'right' : 'left',
        '&:focus': { outline: 'none' }
    }
}));

const LargeImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    width: THUMB_SIZE,
    overflow: 'hidden',
    height: THUMB_SIZE,
    position: 'relative',
    margin: theme.spacing(0, 1),
    borderRadius: theme.shape.borderRadiusSm,
    '&:hover': {
        opacity: 0.72,
        transition: theme.transitions.create('opacity')
    },
    '& .isActive': {
        top: 0,
        zIndex: 9,
        opacity: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: theme.shape.borderRadiusSm,
        border: `solid 3px ${theme.palette.primary.main}`,
        backgroundColor: alpha(theme.palette.grey[900], 0.48)
    }
}));


const ThumbImgStyle = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});

function LargeItem({ item, onOpenLightbox }) {
    return (
        <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative' }}>
            <LargeImgStyle alt="large image" src={item} onClick={() => onOpenLightbox(item)} />
        </Box>
    );
}

function ThumbnailItem({ item }) {
    return (
        <ThumbWrapperStyle>
            <Box className="isActive" />
            <ThumbImgStyle alt="thumb image" src={item} />
        </ThumbWrapperStyle>
    );
}


export default function ClothesDetailCarasoul({ product }) {
    const [openLightbox, setOpenLightbox] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    console.log(product.files);


    const settings1 = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        draggable: false,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (current, next) => setCurrentIndex(next)
    };

    const settings2 = {
        dots: false,
        arrows: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        variableWidth: true,
        centerPadding: '0px',
        slidesToShow: product.files.length > 3 ? 3 : product.files.length
    };


    const imagesLightbox = [...product.files];
    imagesLightbox.forEach((img, i) => {
        imagesLightbox[i] = CLOTHES_IMAGE + `/${product._id}/${img}`
    })

    const handleOpenLightbox = (url) => {
        const selectedImage = findIndex(imagesLightbox, (index) => index === url);
        setOpenLightbox(true);
        setSelectedImage(selectedImage);
    };

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, [currentIndex]);

    useEffect(() => {
        slider2.current.slickNext();
    }, [])

    const handlePrevious = () => {
        slider2.current.slickPrev();
    };

    const handleNext = () => {
        slider2.current.slickNext();
    };

    return (
        <RootStyle>
            <Box sx={{ p: 1 }}>
                <Box
                    sx={{
                        zIndex: 0,
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <Slider {...settings1} asNavFor={nav2} ref={slider1}>
                        {product.files.map((item) => (
                            <LargeItem key={item} item={CLOTHES_IMAGE + `/${product._id}/${item}`} onOpenLightbox={handleOpenLightbox} />
                        ))}
                    </Slider>
                    <CarouselControlsArrowsIndex
                        index={currentIndex}
                        total={product.files.length}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    my: 3,
                    mx: 'auto',
                    '& .slick-current .isActive': { opacity: 1 },
                    ...(product.files.length <= 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
                    ...(product.files.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
                    ...(product.files.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
                    ...(product.files.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
                    ...(product.files.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
                    ...(product.files.length > 2 && {
                        position: 'relative',
                        '&:before, &:after': {
                            top: 0,
                            zIndex: 9,
                            content: "''",
                            height: '100%',
                            position: 'absolute',
                            backgroundImage: (theme) =>
                                `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0)} 0%, ${theme.palette.background.paper
                                } 100%)`
                        },
                        '&:after': { right: 0, transform: 'scaleX(-1)' }
                    })
                }}
            >
                <Slider {...settings2} asNavFor={nav1} ref={slider2}>
                    {product.files.map((item) => (
                        <ThumbnailItem key={item} item={CLOTHES_IMAGE + `/${product._id}/` + item} />
                    ))}
                </Slider>
            </Box>

            <LightboxModal
                images={imagesLightbox}
                photoIndex={selectedImage}
                setPhotoIndex={setSelectedImage}
                isOpen={openLightbox}
                onClose={() => setOpenLightbox(false)}
            />



        </RootStyle>
    )
}