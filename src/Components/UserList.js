import React, { Component } from "react";
import { View, Text, List, ListItem, Left, Thumbnail, Body } from "native-base";

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() 
  {
    console.log(this.props.users);
    return (
      <List>
        {this.props.users.map((user, index) => {
          return (
            <ListItem
              key={index}
              onPress={() => {
                // this.props.navigation.navigate('FriendDetails', {user});
              }}
              avatar
            >
              {user.image && (
                <Left>
                  <Thumbnail large source={{ uri: user.image }} />
                </Left>
              )}

              <Body style={{ height: 60 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {user.name}
                </Text>
              </Body>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default UserList;
