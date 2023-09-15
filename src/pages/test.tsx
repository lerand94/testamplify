import { Authenticator, Button, Heading, View, useAuthenticator, useTheme, Image, Text } from '@aws-amplify/ui-react';

export default function Test() {

    const components = {
      
        SignIn: {
          Header() {
            const { tokens } = useTheme();
      
            return (
              <Heading
                padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                level={3}
              >
                Sign in to your account
              </Heading>
            );
          },
          Footer() {
            const { toResetPassword } = useAuthenticator();
      
            return (
              <>
                
              </>
            );
          },
        },
      
        ConfirmSignIn: {
          Header() {
            const { tokens } = useTheme();
            return (
              <Heading
                padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                level={3}
              >
                Enter Information:
              </Heading>
            );
          },
          Footer() {
            return <Text>Footer Information</Text>;
          },
        },
      };
      
      const formFields = {
        signIn: {
          username: {
            placeholder: 'Enter your email',
          },
        },
      };

    return (
        // <Authenticator hideSignUp={true}>
        <Authenticator formFields={formFields} components={components} hideSignUp={true} loginMechanisms={['username']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    )
}