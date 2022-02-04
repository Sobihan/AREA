import 'package:area/Components/Common/color.dart';
import 'package:area/Components/Common/rect.dart';
import 'package:flutter/material.dart';

//ignore: must_be_immutable
class Service extends StatefulWidget {
  final String host;
  bool isConnect;
  final String name;
  final Function connect;
  final Function disconnect;
  // final GestureDetector button;
  final Icon icon;

  Service(
      {Key? key,
      required this.connect,
      required this.disconnect,
      required this.icon,
      required this.host,
      required this.isConnect,
      required this.name})
      : super(key: key);

  @override
  State<Service> createState() => _ServiceState();
}

class _ServiceState extends State<Service> {
  void onTapHandler() {
    if (widget.isConnect) {
      widget.disconnect();
      widget.isConnect = false;
      setState(() {});
    } else {
      widget.connect;
      widget.isConnect = true;
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.isConnect
          ? () => {widget.disconnect()}
          : () => {widget.connect()},
      child: Container(
        alignment: Alignment.center,
        decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                  color: Colors.blueGrey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3)),
            ],
            borderRadius: const BorderRadius.all(Radius.circular(5))),
        height: 60,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            widget.icon,
            Text(widget.name),
            widget.isConnect
                ? rect("Status: Connected", CustomColor.lightGreen, 150, 40)
                : rect("Status: Disconnected", CustomColor.lightRed, 150, 40)
          ],
        ),
      ),
    );
  }
}
