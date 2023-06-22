import { Heading, Center } from "native-base";

type Props = {
  title: string
}

export function ScreenHeader({title}: Props) {
  return (
    <Center bg="gray.600" pt={16} pb={6} alignItems="center">
        <Heading color="gray.100" fontSize="xl" fontFamily="heading">
          {title}
        </Heading>
    </Center>
  );
}
