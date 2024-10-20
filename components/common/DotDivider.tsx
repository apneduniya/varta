import { View } from "react-native";


interface DotDividerProps {
    verticalSpace?: number;
    size?: number;
}

export default function DotDivider({ size = 3, verticalSpace = 16 } : DotDividerProps) {
    return (
        <View
            style={{ height: size, width: size, backgroundColor: "gray", marginVertical: verticalSpace, borderRadius: 100, alignSelf: "center" }}
        ></View>
    )
}


