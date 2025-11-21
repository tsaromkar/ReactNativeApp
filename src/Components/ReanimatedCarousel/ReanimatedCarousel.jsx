import * as React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import {
    useSharedValue,
} from "react-native-reanimated";
import Carousel, {
    Pagination,
} from "react-native-reanimated-carousel";

const ReanimatedCarousel = ({ data, renderItem }) => {
    const scrollOffsetValue = useSharedValue(0);
    const progress = useSharedValue(0);
    const { width: windowWidth } = useWindowDimensions();

    const ref = React.useRef(null);

    const onPressPagination = (index) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View
            id="carousel-component"
            dataSet={{ kind: "utils", name: "pagination" }}
            style={styles.container}
        >
            <Carousel
                ref={ref}
                loop={true}
                width={windowWidth}
                height={258}
                snapEnabled={true}
                pagingEnabled={true}
                autoPlay
                autoPlayInterval={3000}
                data={data}
                defaultScrollOffsetValue={scrollOffsetValue}
                style={styles.carousel}
                onScrollStart={() => {
                    // console.log("Scroll start");
                }}
                onScrollEnd={() => {
                    // console.log("Scroll end");
                }}
                onConfigurePanGesture={(g) => {
                    "worklet";
                    g.enabled(false);
                }}
                onSnapToItem={(index) => {
                    // console.log("current index:", index)
                }}
                onProgressChange={progress}
                renderItem={renderItem}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                size={10}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                containerStyle={styles.paginationContainer}
                horizontal
                onPress={onPressPagination}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    carousel: {
        width: "100%",
    },
    dot: {
        borderRadius: 100,
        backgroundColor: "#aaa",
    },
    activeDot: {
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: "green",
    },
    paginationContainer: {
        gap: 10,
    },
});

export default ReanimatedCarousel;
