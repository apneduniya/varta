import { Colors } from "@/constants/Colors";
import { Alert, Pressable, Text, View } from "react-native";
import { useForm } from 'react-hook-form';
import InputField from "@/components/form/InputFeild";
import SubmitButton from "@/components/button/SubmitButton";
import DotDivider from "@/components/common/DotDivider";
import { router } from "expo-router";
import { loginUserAPI } from "@/service/auth/loginUser";


export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: any) => {
        // Simulate form submission
        // console.log('Submitted Data:', data);
        // console.log(errors);

        if (!data.email.includes("@")) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        const { email, password } = data;
        const response = await loginUserAPI(email, password);

        if (response.status === "error") {
            Alert.alert("Error", response.message);
        }

        router.navigate("/settings");
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
            <Text style={{ marginTop: 16, color: Colors.current.text, fontFamily: "NeueMachina-UltraBold", fontSize: 36, textAlign: "center" }}>
                Welcome Back
            </Text>
            <Text style={{ color: "gray", fontFamily: "EulidCircular-Regular", fontSize: 14, textAlign: "center" }}>
                Please enter your email and password to continue
            </Text>
            <View
                style={{ marginVertical: 32, flexDirection: 'column', gap: 20 }}
            >
                <InputField
                    control={control}
                    isError={errors.email ? true : false}
                    errorMessage={"Your email is required!"}
                    placeholder="Email"
                    name="email"
                    rules={{ required: true }}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <InputField
                    control={control}
                    isError={errors.password ? true : false}
                    errorMessage={errors.password?.message}
                    placeholder="Password"
                    name="password"
                    rules={{ required: 'Your password is required!' }}
                    secureTextEntry={true}
                />
                <View style={{ marginTop: 8 }}>
                    <SubmitButton title="Sign In" onPress={handleSubmit(onSubmit)} />
                </View>
                <DotDivider verticalSpace={0} />
                <View style={{ flexDirection: "row", gap: 4, justifyContent: "center" }}>
                    <Text style={{ color: Colors.current.text, fontFamily: "EulidCircular-Regular", textAlign: "center" }}>
                        Don't have an account?
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.navigate("/register");
                        }}
                    >
                        <Text style={{ color: Colors.current.tint, fontFamily: "EulidCircular-Regular" }}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}


