import 'package:area/Components/Login/background.dart';
import 'package:area/Components/User/input_section.dart';
import 'package:area/Components/User/profile.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';

class EditProfilPage extends StatefulWidget {
  final User user;
  const EditProfilPage({Key? key, required this.user}) : super(key: key);

  @override
  _EditProfilPageState createState() => _EditProfilPageState();
}

class _EditProfilPageState extends State<EditProfilPage> {
  late TextEditingController _controllerName;
  late TextEditingController _controllerLastName;
  late TextEditingController _controllerEmail;

  @override
  void initState() {
    _controllerName = TextEditingController(text: widget.user.name);
    _controllerLastName = TextEditingController(text: widget.user.lastName);
    _controllerEmail = TextEditingController(text: widget.user.email);
    super.initState();
  }

  AppBar buildAppBar() {
    return AppBar(leading: const BackButton(), elevation: 0);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: Container(
        height: double.infinity,
        width: double.infinity,
        decoration: background(),
        child: ListView(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          physics: const BouncingScrollPhysics(),
          children: [
            const SizedBox(height: 10),
            Profile(
                imagePath: widget.user.avatar, onClicked: () {}, isEdit: true),
            const SizedBox(height: 24),
            inputSection(
                hintText: "Name", isSecure: false, controller: _controllerName),
            const SizedBox(height: 24),
            inputSection(
                hintText: "Last Name",
                isSecure: false,
                controller: _controllerLastName),
            const SizedBox(height: 24),
            inputSection(
                hintText: "E-mail",
                isSecure: false,
                controller: _controllerEmail),
            const SizedBox(height: 30),
            ElevatedButton(onPressed: () {}, child: const Text("SAVE"))
          ],
        ),
      ),
    );
  }
}
