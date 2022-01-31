import 'package:area/Components/Login/background.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';

class UserPage extends StatefulWidget {
  final String host;
  final User user;

  const UserPage({Key? key, required this.host, required this.user})
      : super(key: key);
  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        child: Stack(children: <Widget>[
      Container(
          height: double.infinity,
          width: double.infinity,
          decoration: background(),
          child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(
                horizontal: 25,
                vertical: 120,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [Text("User Page")],
              )))
    ]));
  }
}
