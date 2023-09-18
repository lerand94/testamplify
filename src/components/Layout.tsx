import { Flex, View, useAuthenticator, Text, Button, Authenticator, Heading, useTheme } from "@aws-amplify/ui-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Auth } from "aws-amplify"
import { useEffect, useState } from "react"

export const Layout = ({children}: React.PropsWithChildren) => {
    const router = useRouter();
    const [userGroup,setUserGroup] = useState('')
    const {user,route, signOut} = useAuthenticator((context) => [context.user,context.route,context.signOut]);

    useEffect(() => {
        const fetchData = async () => {
            const userGroupRequest = Auth.currentAuthenticatedUser()
            .then(data => {
                data.signInUserSession.accessToken.payload.hasOwnProperty('cognito:groups') ?
                setUserGroup(data.signInUserSession.accessToken.payload['cognito:groups'][0]) : null
            });
        }
        fetchData();
      }, [user]);

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
        <Flex minHeight="100vh" backgroundColor="background.secondary" position={'relative'} direction={"column"}>
            <Flex boxShadow="large" direction="row" paddingBlock="xs" paddingInline="xl" justifyContent={'space-between'} borderRadius={'10px'}>
                <Flex alignItems={'center'} fontWeight={'bold'}>
                    <Link href="/" color={'#FFC0CB'}>Home</Link>
                    {userGroup == 'Moderator' ? <Link href="/create">Create</Link> : null}
                    {/* <Link href="/archives">Archives</Link> */}
                </Flex>
                <Flex alignItems={'center'}>
                    {user ? (
                        <>
                        <Text>{user.username}</Text>
                        <Button onClick={() => {
                            signOut();
                            router.push('/')
                        }}>
                            Sign Out
                        </Button>
                        </>
                        ) : null
                    }
                </Flex>
                {/* {user ? (
                <>
                <Text>{user.signInUserSession.idToken.payload['cognito:groups']}</Text>
                </>
                ) : null} */}
                {/* {!user ? (
                <Button onClick={() => {
                    router.push('/create')
                }}> 
                    Sign In
                </Button>
                ): null
                } */}

            </Flex>
            { route === 'authenticated' ? <Flex direction="column" alignItems="center" padding="xl" grow={'1'}>{children}</Flex> :

                <Authenticator formFields={formFields} components={components} hideSignUp={true} loginMechanisms={['username']}>
                </Authenticator>
            } 
            {/* { <Flex direction="column" alignItems="center" padding="xl">{children}</Flex>  }  */}
        </Flex>
    )
}