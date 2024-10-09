import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class FriendsListPage extends StatelessWidget {
  final List<String> friends;

  // Constructor to accept the friends list
  FriendsListPage({required this.friends});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Friends List"),
      ),
      body: ListView.builder(
        itemCount: friends.length,
        itemBuilder: (context, index) {
          return ListTile(
            leading: CircleAvatar(
              backgroundImage: NetworkImage(
                "https://via.placeholder.com/150.png?text=${friends[index]}",
              ),
            ),
            title: Text(friends[index]),
          );
        },
      ),
    );
  }
}
