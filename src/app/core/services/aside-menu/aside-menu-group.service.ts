import { adminGroups, mainUserGroups, userGroups } from '@layouts/aside-menu/group';
import { Injectable } from '@angular/core';

import { AuthService } from '@services/auth/auth.service';
import { IAsideMenuGroup } from '@layouts/aside-menu/aside-menu-group/aside-menu-group.component';
import { Router } from '@angular/router';
import { MenuGroupLabel } from '@layouts/aside-menu/menu-groupe-label';
import { UserRole } from '@layouts/aside-menu/user-role';

@Injectable()
export class AsideMenuGroupService {

  public groups: IAsideMenuGroup[];

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.groups = null;

    if (this.auth.isAdmin()) {
      this.groups = [...adminGroups];
    } else {
      this.groups = [...userGroups];
    }

    if (this.auth.isRoot()) {
      this.groups = null;
      this.groups = JSON.parse(JSON.stringify([...adminGroups]));

      const extraItems = [
        {
          title: 'System SMS', route: '/settings/system-sms'
        },
        {
          title: 'Root', route: '/settings/root/config',
        },
      ];

      this.groups.find((group: IAsideMenuGroup) => group.label === MenuGroupLabel.Settings)
        .subItems.push(...extraItems);
    }

    if (this.auth.isMainUser()) {
      this.groups = [...mainUserGroups];
      let route: string;

      switch (this.auth.getUserRole()) {
        case UserRole.BUYER :
          route = '/profiles/user-profiles/buyers';
          break;
        case UserRole.SUPPLIER:
          route = '/profiles/user-profiles/supplier';
          break;
        case UserRole.FINANCIER:
          route = '/profiles/user-profiles/financier';
          break;
      }

      // hide Manage users for MainUser
      // const indexToInsert = this.groups.findIndex((group: IAsideMenuGroup) => group.label === MenuGroupLabel.Transactions);
      //
      // const MenuItemToInsert: IAsideMenuGroup = {
      //   iconName: 'menu/users',
      //   title: 'Manage users',
      //   route: route,
      // };

      // if (indexToInsert !== -1) {
      //   this.groups.splice(indexToInsert + 1, 0, MenuItemToInsert);
      // }

      const indexToInsert = this.groups.findIndex((group: IAsideMenuGroup) => group.label === MenuGroupLabel.Transactions);

      if (this.auth.isClient()) {
        if (indexToInsert !== -1) {
          this.groups.splice(indexToInsert + 1, 0);
        }
      } else {
        const MenuItemToInsert: IAsideMenuGroup = {
          iconName: 'menu/users',
          title: 'Manage users',
          route: route,
        };

        if (indexToInsert !== -1) {
          this.groups.splice(indexToInsert + 1, 0, MenuItemToInsert);
        }
      }
    }
  }

  public getGroups(): IAsideMenuGroup[] {
    return this.groups;
  }

  public getActiveGroups(): IAsideMenuGroup {
    return this.groups.find((group: IAsideMenuGroup) => this.router.isActive(group.route, false));
  }
}
