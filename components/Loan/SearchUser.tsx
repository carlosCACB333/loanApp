import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Card,
  Text,
  TextInput,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';

import {IUser} from '../../interfaces';
import {Br} from '../Br';

interface Props {
  setSearch: (s: string) => void;
  users?: IUser[];
  setBorrower: (b: IUser) => void;
  selectedUser?: IUser;
  refreshing: boolean;
}
export const SearchUser = ({
  setSearch,
  users,
  setBorrower,
  selectedUser,
  refreshing,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        height: 400,
      }}>
      <TextInput
        onChangeText={setSearch}
        mode="outlined"
        placeholder="Buscar contacto"
        right={<TextInput.Icon icon="magnify" />}
      />
      <Br />
      <Text>({users?.length}) resultados</Text>
      <Br size={2} />
      <FlatList
        data={users}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[colors.primary]}
            progressBackgroundColor={colors.background}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <CardUser
            setBorrower={setBorrower}
            user={item}
            selectedUser={selectedUser}
          />
        )}
        ItemSeparatorComponent={() => <Br size={2} />}
      />
    </View>
  );
};

const CardUser = ({
  user,
  setBorrower,
  selectedUser,
}: {
  user: IUser;
  setBorrower: (s: IUser) => void;
  selectedUser?: IUser;
}) => {
  const {colors} = useTheme();
  return (
    <Card
      style={{
        backgroundColor:
          user._id === selectedUser?._id ? colors.primary : colors.surface,
      }}>
      <Card.Content>
        <TouchableOpacity onPress={() => setBorrower(user)}>
          <View style={styles.avatarContainer}>
            {user.photo ? (
              <Avatar.Image
                size={50}
                source={{
                  uri: user.photo,
                }}
              />
            ) : (
              <Avatar.Text
                label={user.firstName.charAt(0) + user.lastName.charAt(0)}
                size={50}
              />
            )}
            <Br size={2} />
            <View>
              <Text>{`${user.firstName} ${user.lastName}`}</Text>
              <Text>{user.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
