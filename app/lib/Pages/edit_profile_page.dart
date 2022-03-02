import 'package:area/Components/Login/background.dart';
import 'package:area/Components/User/input_section.dart';
import 'package:area/Components/User/profile.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io' as Io;
import 'dart:convert';
import 'dart:developer';

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
  // String imagePath = "";
  late User _newUser;

  @override
  void initState() {
    _controllerName = TextEditingController(text: widget.user.name);
    _controllerLastName = TextEditingController(text: widget.user.lastName);
    _controllerEmail = TextEditingController(text: widget.user.email);
    // imagePath = widget.user.avatar;
    _newUser = widget.user.copy();
    super.initState();
  }

  AppBar buildAppBar() {
    return AppBar(leading: const BackButton(), elevation: 0);
  }

  String encodeImage(String path) {
    final bytes = Io.File(path).readAsBytesSync();
    String img64 = base64Encode(bytes);
    return img64;
  }

  void pickImage() async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(source: ImageSource.gallery);
    if (image == null) return;
    String b64 = encodeImage(image.path);
    setState(() {
      _newUser.avatar = "data:image/png;base64,$b64";
    });
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
                imagePath: _newUser.avatar,
                onClicked: () => pickImage(),
                isEdit: true),
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
            ElevatedButton(
                onPressed: () {
                  _newUser.lastName = _controllerLastName.text;
                  _newUser.name = _controllerName.text;
                  Navigator.pop(context, _newUser);
                },
                child: const Text("SAVE"))
          ],
        ),
      ),
    );
  }
}
