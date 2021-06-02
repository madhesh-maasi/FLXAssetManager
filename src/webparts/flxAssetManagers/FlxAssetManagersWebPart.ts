import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPComponentLoader } from "@microsoft/sp-loader";

SPComponentLoader.loadScript(
  // "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js"
  "https://code.jquery.com/jquery-3.5.1.js"
);

import * as $ from "jquery";

import styles from './FlxAssetManagersWebPart.module.scss';
import * as strings from 'FlxAssetManagersWebPartStrings';

import { sp } from "@pnp/sp/presets/all";
import "../../ExternalRef/Css/style.css";
import "../../ExternalRef/Css/Bootstrap.min.css";
import "../../ExternalRef/js/Bootstrap.js";
import "../../ExternalRef/css/alertify.min.css";
var alertify: any = require("../../ExternalRef/js/alertify.min.js");  

var siteURL = "";
var docurl ="";
var Filename=[];
var Fileupload=[];
var FileuploadEdit=[];
var allitems=[];
var editdata='';
var urlFile = "";
var updateUrlFile = "";
export interface IFlxAssetManagersWebPartProps {
  description: string;
}
let SelectedFileName = ""
export default class FlxAssetManagersWebPart extends BaseClientSideWebPart<IFlxAssetManagersWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });  
    }); 
  } 

  public render(): void {
    siteURL = this.context.pageContext.web.absoluteUrl;
    this.domElement.innerHTML = `
    <div class ="border-left-manager">
    <div class="headermangerassit ">
      <h5 class=" Assethead mx-5 ">     
      Asset Managers</h5>
      </div>
    <div class="cont"> 
     
    <div class="row announcements-section">
    <div class="col-6 announcement p-0">

    <div class="modal fade" id="announcementModal" tabindex="-1" aria-labelledby="announcementModalLabel" aria-hidden="true">
  <div class="modal-dialog announcement-modal-dialog">
    <div class="modal-content rounded-0 ">
      <div class="modal-header">
        <h5 class="modal-title fw-bold w-100 text-center" id="announcementModalLabel">Add Manager View</h5>
       
      </div> 
      <div class="modal-body announcement-modal"> 
        <div class="row align-items-center my-3"><div class="col-4">Title</div><div class="col-1">:</div><div class="col-7">
        <input class="form-control rounded-0" type="text" id="txttitle"></div></div>
        
        
        <div class="row align-items-center my-3"><div class="col-4">Source</div><div class="col-1">:</div><div class="col-7 clsRadioSec">
        
        <label><input type="radio" class="radioc" name="urlFile" id="urlRadio" value="Url"> Url </label>
        <label><input type="radio"  class="radioc" name="urlFile" id="fileRadio" value="File"> File</label>


        
        </div></div>


        <div class="row align-items-center my-3 radioToggle" id="urlSection" style="display:none"><div class="col-4">URL</div><div class="col-1">:</div><div class="col-7"><input class="form-control rounded-0" type="text" id="txturl"></div></div>
        <div class="row align-items-center my-3 radioToggle" id="fileSection" style="display:none"><div class="col-4">File</div><div class="col-1">:</div><div class="col-7"><input class="form-control-file custom-file-upload" type="file" id="uploadfile"></div></div>
        <div class="row align-items-center my-3"><div class="col-4">Document Type</div><div class="col-1">:</div><div class="col-7">
  
        <div class="btn-group option-checkboxes w-100" role="group" aria-label="Basic checkbox toggle button group">

  <input type="checkbox" class="btn-check" id="btnsensitive" autocomplete="off">
  <label class="btn btn-outline-theme" for="btnsensitive">Sensitive</label>
  
  <input type="checkbox" class="btn-check" id="btnvisible" autocomplete="off">
  <label class="btn btn-outline-theme" for="btnvisible">Visible</label>

  <input type="checkbox" class="btn-check" id="btnnewtab" autocomplete="off">
  <label class="btn btn-outline-theme" for="btnnewtab">Open a new tab</label>
</div>
 
        </div></div>
      </div>
      <div class="modal-footer"> 
        <button type="button" class="btn btn-sm btn-secondary rounded-0" data-bs-dismiss="modal" id="btnclose">Close</button>
        <button type="button" class="btn btn-sm btn-theme rounded-0" id="btnsubmit">Submit</button> 
      </div>
    </div>
  </div>
</div>    


                                       <!----edit--->

<div class="modal fade" id="announcementModalEdit" tabindex="-1" aria-labelledby="announcementModalLabel" aria-hidden="true">
<div class="modal-dialog announcement-modal-dialog">
  <div class="modal-content rounded-0">
    <div class="modal-header">
      <h5 class="modal-title fw-bold w-100 text-center" id="announcementModalLabel">Edit Manager View</h5>
     <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
    </div>  
    <div class="modal-body announcement-modal"> 
      <div class="row align-items-center my-3"><div class="col-4">Title</div>
      <div class="col-1">:</div><div class="col-7"><input class="form-control rounded-0" type="text" id="edittitle"></div></div>

      <!--<div class="row align-items-center my-3"><div class="col-4">Attachment URL</div><div class="col-1">:</div><div class="col-7"><input class="form-control" type="text" id="attachurl"></div></div>
      <div class="row align-items-center my-3"><div class="col-4">Source</div><div class="col-1">:</div><div class="col-7 clsRadioSec">
        <label><input type="radio" class="Eradioc" name="EurlFile" id="EurlRadio" value="Url"> Url </label>
        <label><input type="radio"  class="Eradioc" name="EurlFile" id="EfileRadio" value="File"> File</label>
        </div></div>-->
      <div class="row align-items-center my-3" id="EurlSection" style="display:none"><div class="col-4">URL</div><div class="col-1">:</div><div class="col-7"><input class="form-control" type="text" id="editurl"></div></div>
      <div class="row align-items-start my-3" id="EfileSection" style="display:none"><div class="col-4">File</div><div class="col-1">:</div><div class="col-7" id="editFUploadSec"><div><input class="form-control-file custom-file-upload" type="file" id="uploadfileedit"></div><div class="uploadedFile mt-1"></div></div></div>
      <div class="row align-items-center my-3"><div class="col-4">Document Type</div><div class="col-1">:</div><div class="col-7">
  
      <div class="btn-group option-checkboxes w-100" role="group" aria-label="Basic checkbox toggle button group">

<input type="checkbox" class="btn-check" id="editsensitive" autocomplete="off">
<label class="btn btn-outline-theme" for="editsensitive">Sensitive</label>

<input type="checkbox" class="btn-check" id="editvisible" autocomplete="off">
<label class="btn btn-outline-theme" for="editvisible">Visible</label>

<input type="checkbox" class="btn-check" id="editnewtab" autocomplete="off">
<label class="btn btn-outline-theme" for="editnewtab">Open a new tab</label>
</div>

      </div></div>
    </div>
    <div class="modal-footer justify-content-between"> 
    <div>
    <button type="button" class="btn btn-sm btn-danger rounded-0" id="AnABtnDelete" data-bs-toggle="modal" data-bs-target="#AnADeleteModal">Delete</button>
     </div>
      <div class="d-flex">
      <button type="button" class="btn btn-sm btn-secondary mx-1 rounded-0"  id = "btnUpdateClose" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-sm btn-theme mx-1 rounded-0" id="btnupdate">Update</button> </div>
    </div>
  </div>
</div>
</div> 

<div class="modal fade" id="AnADeleteModal" tabindex="-1" aria-labelledby="AnADeleteModalLabel" aria-hidden="true">
  <div class="modal-dialog AnA-delete-warning-dialog">
    <div class="modal-content rounded-0">
      <div class="modal-header">
        
      </div>
      <div class="modal-body AnA-delete-warning text-center pt-5"> 
      <h5 class="modal-title" id="deleteAlterModalLabel">Confirmation</h5>
      <p class="mb-0">Are you sure want to Delete?</p>
      </div>
      <div class="modal-footer">    
        <button type="button" id="cancelAnADelete" class="btn btn-sm btn-secondary rounded-0" data-bs-dismiss="modal">No</button>
        <button type="button" id="confirmAnADelete" class="btn btn-sm btn-danger rounded-0 ">Yes</button>
      </div>
    </div>
  </div>
</div>  

    <div class="border announcement-sec">           
    <h5 class="bg-secondary text-light px-4 py-2" id="headerTitle">Manager View</h5>
    <div class="add-announcements px-4 py-1 border-bottom">
    <a class="text-info cursor " data-bs-toggle="modal" data-bs-target="#announcementModal">+ Add Manager View</a>
    </div>
    <div id="announcement-list" class="announcement-list">    
    <ul class="list-unstyled" id="announcement-one"> 
    <!--<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>
    <li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf col-2"></span><a href="#">FLX Announcements</a></li>-->
    </ul> 
    </div>     
    </div>
    </div>
   
          
    </div> 
    </div>
    </div>
    `;  
    //$("#headerTitle").text(headerTitle)
    $("#AnABtnDelete").click(()=>{
      $(".announcement-modal-dialog").hide();
    });
    $("#cancelAnADelete").click(()=>{
      $(".announcement-modal-dialog").show();
    });
    $("input[type=radio][name=urlFile]").change(function(e) {
      urlFile = e.currentTarget.value;
      console.log(urlFile);
      if(e.currentTarget.value == "Url"){
        $("#urlSection").show();
        $("#fileSection").hide();
      }else if (e.currentTarget.value == "File"){
        $("#urlSection").hide();
        $("#fileSection").show();
        $("#txturl").val("");
      }
          });
    $("input[type=radio][name=EurlFile]").change(function(e) {
            updateUrlFile = e.currentTarget.value;
            console.log(updateUrlFile);
            if(e.currentTarget.value == "Url"){
              $("#EurlSection").show();
              $("#EfileSection").hide();
            }else if (e.currentTarget.value == "File"){
              $("#EurlSection").hide();
              $("#EfileSection").show();
              $("#editurl").val("");
            }
                });

    getFLXManagerview();
    $(document).on('click','.sensitive', function(e)
    {
      var data=$(this).attr("data-index"); 
      e.preventDefault();
      alertify.confirm('Confirm Title','Are you sure want to proceed?',
  function(){
    if(allitems[data].Openanewtab==true)
    window.open(allitems[data].Url, '_blank');
    else
    window.location.href = allitems[data].Url;
    //alertify.success('Ok');
  },
  function(){
    //alertify.error('Cancel');
  });
    });
    $("#btnsubmit").click(async function()
    {
      $(".announcement-modal-dialog").hide();
    await addItems();
    });
    $("#btnupdate").click(async function()
    {
      $(".announcement-modal-dialog").hide();
    await updateItems();
    });
    $(document).on('click','.icon-edit-announce',async function()
    {
        // FileFormFolder
    editdata=$(this).attr("data-id"); 
    console.log(editdata); 
    
    $("#edittitle").val(allitems[editdata].Title);
    $("#editurl").val(allitems[editdata].Url); 
 
    if(allitems[editdata].UrlOrFile == "File"){
      SelectedFileName = allitems[editdata].Url.split('/').pop();
      $(".uploadedFile").html("");
      $(".uploadedFile").html(`<a href="${allitems[editdata].Url}">${SelectedFileName}</a>`);
    }else{
      $(".uploadedFile").html("")
    }
       
    if(allitems[editdata].UrlOrFile == "Url"){
      updateUrlFile = "Url"
      $("#EurlRadio").prop("checked",true);
      $("#EurlSection").show();
      $("#EfileSection").hide();
    } else{
      updateUrlFile = "File"
      $("#EfileRadio").prop("checked",true);
      $("#EurlSection").hide();
      $("#EfileSection").show();
      // $("#editFUploadSec").html(`<input class="form-control-file custom-file-upload" type="file" id="uploadfileedit">`)
    }
    console.log(`InList : ${urlFile}`);
    
    $("#editsensitive").prop( "checked", allitems[editdata].SensitiveDocument);
    $("#editvisible").prop("checked",allitems[editdata].Visible);
    $("#editnewtab").prop("checked",allitems[editdata].Openanewtab);
    
    });
    
    $("#btnclose").click(function()
    {
      $("#txttitle").val("");
      $("#btnsensitive").val("");
      $("#btnvisible").val("");
      $("#btnnewtab").val("");
      $("#uploadfile").val("");
      $("#txturl").val("");
      
      let radioReset = document.getElementsByName("urlFile");
      for(var i=0;i<radioReset.length;i++)
      radioReset[i]["checked"] = false;
    });
    $("#btnUpdateClose").click(()=>{
      $("#uploadfileedit").val("")

    });
    
    $(document).on("change", "#uploadfile", function () {
      if ($(this)[0].files.length > 0) {
        for (let index = 0; index < $(this)[0].files.length; index++) {
          const file = $("#uploadfile")[0]["files"][index];
          Fileupload.push(file);
        }
        //$(this).val("");
        $(this).parent().find("label").text("Choose File");
      }
    });
    $(document).on("change", "#uploadfileedit", function () {
      
      if ($(this)[0].files.length > 0) {
        for (let index = 0; index < $(this)[0].files.length; index++) {
          const file = $("#uploadfileedit")[0]["files"][index];
          FileuploadEdit.push(file);
        }
        //$(this).val("");
        $(this).parent().find("label").text("Choose File");
        $(".uploadedFile").html("")
      }else{
        $(".uploadedFile").html(`<a href="${allitems[editdata].Url}">${SelectedFileName}</a>`);
      }
    });
    $("#confirmAnADelete").click(()=>{
      deleteAnA(allitems[editdata].ID)
    })
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

async function getFLXManagerview()
{


  // if(FLXManagerview)
  // {
    await sp.web.lists.getByTitle("FLXManagerview").items.select("*").filter("Visible eq '" + 1 + "'").get().then(async (item)=>
    {
  var htmlforannouncement="";
  allitems=item;
  console.log(allitems);
  if(item.length  == 0){
    
    $("#announcement-list").html(`<div class="text-center pt-5">No Items Available</div>`)
  }
  for(var i=0;i<item.length;i++){
    Filename.push(item[i].Url.split('/').pop());
    console.log("Filename");
  console.log(Filename);
  
    if(item[i].SensitiveDocument==true){
    if(item[i].Openanewtab==true){
      if (Filename[i].split(".").pop() == "pdf")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row">
    <span class="announce-icon announce-pdf mx-1 col-1"></span>
    <a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a>
    <div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "ppt")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-ppt mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "doc" || Filename[i].split(".").pop() == "docx")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-doc mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "xlsx" || Filename[i].split(".").pop() == "csv")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-excel mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "png" || Filename[i].split(".").pop() == "jpg" || Filename[i].split(".").pop() == "jpeg")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-img mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-new mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
  
  }
       
  else {
    if (Filename[i].split(".").pop() == "pdf")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf mx-1 col-1"></span><a data-interception="off"  href="${item[i].Url}" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "ppt")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-ppt mx-1 col-1"></span><a data-interception="off"  href="${item[i].Url}" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "doc" || Filename[i].split(".").pop() == "docx")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-doc mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "xlsx" || Filename[i].split(".").pop() == "csv")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-excel mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "png" || Filename[i].split(".").pop() == "jpg" || Filename[i].split(".").pop() == "jpeg")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-img mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-new mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" class="col-8 sensitive" data-index=${i}>${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
  }
  }
  
  else{
    if(item[i].Openanewtab==true){ 
      if (Filename[i].split(".").pop() == "pdf")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "ppt")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-ppt mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "doc" || Filename[i].split(".").pop() == "docx")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-doc mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "xlsx" || Filename[i].split(".").pop() == "csv")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-excel mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "png" || Filename[i].split(".").pop() == "jpg" || Filename[i].split(".").pop() == "jpeg")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-img mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-new mx-1 col-1"></span><a data-interception="off" href="${item[i].Url}" target="_blank" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
  
  }
  
  else {
    if (Filename[i].split(".").pop() == "pdf")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-pdf mx-1 col-1"></span><a href="${item[i].Url}" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "ppt")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-ppt mx-1 col-1"></span><a href="${item[i].Url}" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "doc" || Filename[i].split(".").pop() == "docx")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-doc mx-1 col-1"></span><a href="${item[i].Url}" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "xlsx" || Filename[i].split(".").pop() == "csv")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-excel mx-1 col-1"></span><a href="${item[i].Url}" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else if (Filename[i].split(".").pop() == "png" || Filename[i].split(".").pop() == "jpg" || Filename[i].split(".").pop() == "jpeg")
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-img mx-1 col-1"></span><a href="${item[i].Url}" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
      else
      {
    htmlforannouncement+=`<li class="py-2 px-4 d-flex align-items-center row"><span class="announce-icon announce-new mx-1 col-1"></span><a href="${item[i].Url}" class="col-8">${Filename[i]}</a><div class="icon-edit-announce col-2" data-id=${i} data-bs-toggle="modal" data-bs-target="#announcementModalEdit"></div></li>`;
      }
  } 
  }
   
  }
  $("#announcement-one").html("");
  $("#announcement-one").html(htmlforannouncement);
    }).catch((error)=>
    {
      console.log(error);
    });
  }

  
  // else{
  //   $("#announcement-one").html("");
  // $("#announcement-one").html(`<li class="py-2 px-4 d-flex align-items-center row">No data to display or Please select list name</li>`);
  // }
  // }

  

  async function addItems() {
    var requestdata = {}; 
     if (Fileupload.length > 0) {
      await Fileupload.map((filedata) => {
            sp.web
              .getFolderByServerRelativeUrl("/sites/FLXCommunity/AnnouncementDocument/FLXManagerview")
              .files.add(filedata.name, filedata, true)
              .then (function(data){
                console.log(data);
                requestdata = {  
                  Title: $("#txttitle").val(),
                  // DocumentUrl:{
                  //   "__metadata": { type: "SP.FieldUrlValue" },
                  //   Description: "",
                  //   Url: $("#txturl").val(),
                
                  // },
                  Url:data.data.ServerRelativeUrl,
                  SensitiveDocument: $("#btnsensitive").is(':checked') ? true : false,
                  Visible: $("#btnvisible").is(':checked') ? true : false,
                  Openanewtab: $("#btnnewtab").is(':checked') ? true : false,
                  UrlOrFile:urlFile
                };
                sp.web.lists
                .getByTitle("FLXManagerview")
                .items.add(requestdata)
                .then(function (data) {
                  console.log(data);
                  AlertMessage("<div class='alertfy-success'>Submitted successfully</div>");
                })
                .catch(function (error) {
                  // ErrorCallBack(error, "addItems");
                  console.log(error);
                  
                });
              })
          });
    }  
    else{
      requestdata = {
        Title: $("#txttitle").val(),
        // DocumentUrl:{
        //   "__metadata": { type: "SP.FieldUrlValue" },
        //   Description: "",
        //   Url: $("#txturl").val(),
      
        // },
        Url:$("#txturl").val(),
        SensitiveDocument: $("#btnsensitive").is(':checked') ? true : false,
        Visible: $("#btnvisible").is(':checked') ? true : false,
        Openanewtab: $("#btnnewtab").is(':checked') ? true : false,
        UrlOrFile:urlFile
      };
      sp.web.lists
      .getByTitle("FLXManagerview")
      .items.add(requestdata)
      .then(function (data) {
        console.log(data);
        AlertMessage("<div class='alertfy-success'>Submitted successfully</div>");
      })
      .catch(function (error) {
        // ErrorCallBack(error, "addItems");
        console.log(error);
        
      });
    }
  }

  async function updateItems() {
console.log(FileuploadEdit);

    var requestdata = {}; 
    var Id=allitems[editdata].ID;
     if (FileuploadEdit.length > 0) {
      await FileuploadEdit.map((filedata) => {
            sp.web
              .getFolderByServerRelativeUrl("/sites/FLXCommunity/AnnouncementDocument/FLXManagerview")
              .files.add(filedata.name, filedata, true)
              .then (function(data){
                console.log(data);
                requestdata = {
                  Title: $("#edittitle").val(),
                  // DocumentUrl:{
                  //   "__metadata": { type: "SP.FieldUrlValue" },
                  //   Description: "",
                  //   Url: $("#txturl").val(),
                  // },
                  Url:data.data.ServerRelativeUrl,
                  SensitiveDocument: $("#editsensitive").is(':checked') ? true : false,
                  Visible: $("#editvisible").is(':checked') ? true : false,
                  Openanewtab: $("#editnewtab").is(':checked') ? true : false,
                  UrlOrFile:updateUrlFile
                };
                sp.web.lists
                .getByTitle("FLXAnnouncement")
                .items.getById(Id).update(requestdata)
                .then(function (data) {
                  console.log(data);
                  AlertMessage("<div class='alertfy-success'>Updated successfully</div>");
                })
                .catch(function (error) {
                  // ErrorCallBack(error, "updateItems");
                  console.log(error);
                  
                });
              })
          }); 
    } else if(FileuploadEdit.length == 0 && updateUrlFile == "File" && SelectedFileName != ""){
      requestdata = {
        Title: $("#edittitle").val(),
        // DocumentUrl:{
        //   "__metadata": { type: "SP.FieldUrlValue" },
        //   Description: "",
        //   Url: $("#txturl").val(),
        // },
        
        SensitiveDocument: $("#editsensitive").is(':checked') ? true : false,
        Visible: $("#editvisible").is(':checked') ? true : false,
        Openanewtab: $("#editnewtab").is(':checked') ? true : false,
        UrlOrFile:updateUrlFile
      };
      sp.web.lists
      .getByTitle("FLXManagerview")
      .items.getById(Id).update(requestdata)
      .then(function (data) {
        console.log(data);
        AlertMessage("<div class='alertfy-success'>Updated successfully</div>");
      })
      .catch(function (error) {
        // ErrorCallBack(error, "updateItems");
        console.log(error);
        
      });
    }else if(FileuploadEdit.length == 0 && updateUrlFile == "File" && SelectedFileName == ""){
      $(".uploadedFile").html(`<p class="text-danger">File Cannot be Empty</p>`)
    }
    else{
      requestdata = {
        Title: $("#edittitle").val(),
        Url:$("#editurl").val(),
        SensitiveDocument: $("#editsensitive").is(':checked') ? true : false,
        Visible: $("#editvisible").is(':checked') ? true : false,
        Openanewtab: $("#editnewtab").is(':checked') ? true : false,
        UrlOrFile:updateUrlFile
      };
      sp.web.lists
      .getByTitle("FLXManagerview")
      .items.getById(Id).update(requestdata)
      .then(function (data) {
        console.log(data);
        AlertMessage("<div class='alertfy-success'>Updated successfully</div>");
      })
      .catch(function (error) {
        // ErrorCallBack(error, "updateItems");
        console.log(error);
        
      }); 

    } 
  }
 
  // async function ErrorCallBack(error, methodname) 
  // {
  //   try {
  //     var errordata = {
  //       Error: error.message,
  //       MethodName: methodname,
  //     };
  //     await sp.web.lists
  //       .getByTitle("ErrorLog")
  //       .items.add(errordata)
  //       .then(function (data) 
  //       {
  //         $('.loader').hide();
  //         AlertMessage("Something went wrong.please contact system admin");
  //       });
  //   } catch (e) {
  //     //alert(e.message);
  //     $('.loader').hide();
  //     Alert("Something went wrong.please contact system admin");
  //   }
  // }
  function AlertMessage(strMewssageEN) {
    alertify
      .alert()
      .setting({
        label: "OK",
        
        message: strMewssageEN,
  
        onok: function () {
          window.location.href = "#";
          location.reload();
        },
      })
      
      .show()
      .setHeader("<div class='fw-bold alertifyConfirmation'>Confirmation</div> ")
      .set("closable", false);
  }
const deleteAnA = (id) =>{
   sp.web.lists.getByTitle("FLXManagerview").items.getById(id).delete().then(()=>{location.reload()}).catch((error)=>{alert("Error Occured");})
}