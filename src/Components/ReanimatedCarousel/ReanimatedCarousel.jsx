import * as React from "react";
import { useWindowDimensions, View } from "react-native";
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
            style={{ gap: 10 }}
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
                style={{ width: "100%" }}
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
                dotStyle={{
                    borderRadius: 100,
                    backgroundColor: "#aaa",
                }}
                activeDotStyle={{
                    borderRadius: 100,
                    overflow: "hidden",
                    backgroundColor: "green",
                }}
                containerStyle={[
                    {
                        gap: 10,
                    },
                ]}
                horizontal
                onPress={onPressPagination}
            />
        </View>
    );
}

export default ReanimatedCarousel;
