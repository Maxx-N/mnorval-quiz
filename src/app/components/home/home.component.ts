import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  logoUrl =
    'https://s3-alpha-sig.figma.com/img/8620/437d/9f54620108415504b77033a47ab7bee9?Expires=1662940800&Signature=VJRNwEc38tZM7-xbR1jb2n9aDO6Zl~lG-LQ~hu4QT4lfLJNOHMDBIz42R8FmdmL9pe2rURSKXwAVRnxEIXT2BC1SocFQORrh-gQtHAb8tDMXUemhfGTeSxAxbPv87penwzmAIIWaAO7Yy~8UfGGQDyzTTTu9diQD-ACQV4FaUznuFc~z2W8R5JiTJq4u4iF9Z4UbOyvdwkA8m0MJrPoVxT4ijjtEfv2Yy9vK~8wQKFJV4uABx3y2YbArzcgp1iiiuHOhxwsbpjHlrGB1dlImsE3MqIT57Oy4kDAfWfBdSxVSZBcgRHYQH04NsuM-CRFVBhz-o96IXScgG2Eq5ik~rg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onStartQuiz(): void {
    this.router.navigate(['quiz']);
  }
}
