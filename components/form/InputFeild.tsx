import { Colors } from '@/constants/Colors';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Text, TextInput } from 'react-native';


interface InputFieldProps {
    control: Control<any>;
    isError: boolean;
    errorMessage: any;
    placeholder: string;
    name: string;
    rules: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
    textContentType?: 'name' | 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'creditCardExpiration' | 'creditCardExpirationMonth' | 'creditCardExpirationYear' | 'creditCardGivenName' | 'creditCardMiddleName' | 'creditCardFamilyName' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'password' | 'newPassword' | 'oneTimeCode';
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
}


export default function InputField({ control, isError, errorMessage, placeholder, name, rules, textContentType, secureTextEntry, keyboardType }: InputFieldProps) {
    return (
        <>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{
                            backgroundColor: Colors.current.tabBackground,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderRadius: 16,
                            color: Colors.current.text,
                            fontFamily: 'EulidCircular-Regular',
                            fontSize: 16,
                        }}
                        placeholderTextColor={Colors.current.text}
                        placeholder={placeholder}
                        textContentType={textContentType}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                    />
                )}
                name={name}
                rules={rules}
            />
            {isError && <Text style={{ color: 'red', marginTop: -10, fontFamily: "EulidCircular-Regular" }}>{errorMessage}</Text>}
        </>
    )
}


