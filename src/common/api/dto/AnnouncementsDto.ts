export default class AnnouncementsDto {
  id: string = "";
  title: string = "";
  description: string = "";
  bannerUrl: string = "";
  imageType: string = "";
  socials: Array<{ type: string; link: string; title?: string }> | null = [];
  createdOn: string = "";
}
