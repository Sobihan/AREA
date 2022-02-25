import 'package:area/Components/Common/color.dart';
import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  final String imagePath;
  final VoidCallback onClicked;
  final bool isEdit;
  const Profile(
      {Key? key,
      required this.imagePath,
      required this.onClicked,
      required this.isEdit})
      : super(key: key);

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  Widget buildImage() {
    ImageProvider image = Image.asset('assets/defaultProfil.png').image;
    return buildCircle(
      all: 3,
      color: Colors.white,
      child: ClipOval(
        child: Material(
          color: Colors.white,
          child: Ink.image(
            image: image,
            fit: BoxFit.cover,
            width: 100,
            height: 100,
            child: InkWell(onTap: widget.onClicked),
          ),
        ),
      ),
    );
  }

  Widget buildEditIcon(Color color) {
    return buildCircle(
      all: 3,
      color: Colors.white,
      child: buildCircle(
        all: 3,
        color: Colors.blue,
        child: Icon(
          widget.isEdit ? Icons.add_a_photo : Icons.edit,
          size: 20,
          color: Colors.white,
        ),
      ),
    );
  }

  Widget buildCircle(
      {required Widget child, required double all, required Color color}) {
    return ClipOval(
      child: Container(
        padding: EdgeInsets.all(all),
        color: color,
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Stack(children: [
      buildImage(),
      Positioned(
        bottom: 0,
        right: 4,
        child: buildEditIcon(CustomColor.lightBlue),
      )
    ]));
  }
}
