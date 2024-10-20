import { Colors } from "@/constants/Colors";
import { Alert, Pressable, Text, View } from "react-native";
import { useForm } from 'react-hook-form';
import InputField from "@/components/form/InputFeild";
import SubmitButton from "@/components/button/SubmitButton";
import DotDivider from "@/components/common/DotDivider";
import { router } from "expo-router";
import { registerUserAPI } from "@/service/auth/registerUser";


export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
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

        const { name, email, password } = data;
        const response = await registerUserAPI(name, email, password);

        if (response.status === "error") {
            Alert.alert("Error", response.message);
        }

        router.navigate("/settings");

    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.current.background, paddingHorizontal: 16 }}>
            <Text style={{ marginTop: 16, color: Colors.current.text, fontFamily: "NeueMachina-UltraBold", fontSize: 36, textAlign: "center" }}>
                Hello There
            </Text>
            <Text style={{ color: "gray", fontFamily: "EulidCircular-Regular", fontSize: 14, textAlign: "center" }}>
                Please enter your name, email and password to continue
            </Text>
            <View
                style={{ marginVertical: 32, flexDirection: 'column', gap: 20 }}
            >
                <InputField
                    control={control}
                    isError={errors.name ? true : false}
                    errorMessage={"Your name is required!"}
                    placeholder="Name"
                    name="name"
                    rules={{ required: true }}
                />
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
                    <SubmitButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
                </View>
                <DotDivider verticalSpace={0} />
                <View style={{ flexDirection: "row", gap: 4, justifyContent: "center" }}>
                    <Text style={{ color: Colors.current.text, fontFamily: "EulidCircular-Regular", textAlign: "center" }}>
                        Already have an account?
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.navigate("/login");
                        }}
                    >
                        <Text style={{ color: Colors.current.tint, fontFamily: "EulidCircular-Regular" }}>Sign In</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}


