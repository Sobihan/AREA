import 'package:area/API/api.dart';
import 'package:area/API/google.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Components/User/service.dart';
import 'package:area/Models/google.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class UserPage extends StatefulWidget {
  final String host;
  final User user;

  const UserPage({Key? key, required this.host, required this.user})
      : super(key: key);
  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  bool googleConnect = false;

  void gButtonPressedLogin() async {
    final user;
    try {
      user = await GoogleSignInApi.login();
    } catch (e) {
      return;
    }

    if (user != null) {
      final token = await user.authentication;
      print(token.accessToken);
      Google googleUser =
          Google.fromGoogleSignInAccount(google: user, token: token);
    } else {
      return;
    }
    setState(() {
      googleConnect = true;
    });
  }

  void gButtonPressedSignOut() async {
    try {
      await GoogleSignInApi.logout();
      setState(() {
        googleConnect = false;
      });
    } catch (e) {
      return;
    }
  }

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
                children: [
                  Service(
                    connect: () => {gButtonPressedLogin()},
                    disconnect: () => {gButtonPressedSignOut()},
                    isConnect: googleConnect,
                    host: widget.host,
                    name: "Google",
                    icon: const Icon(FontAwesomeIcons.google),
                  ),
                ],
              )))
    ]));
  }
}
